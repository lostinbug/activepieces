import {
    AppSystemProp,
    createWebhookContextLog,
    JobType,
    LATEST_JOB_DATA_SCHEMA_VERSION,
    system,
} from '@activepieces/server-shared'
import {
    ALL_PRINCIPAL_TYPES,
    apId,
    EngineHttpResponse,
    EventPayload,
    Flow,
    FlowStatus,
    GetFlowVersionForWorkerRequestType,
    isMultipartFile,
    isNil,
    WebhookUrlParams,
} from '@activepieces/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { FastifyBaseLogger, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { tasksLimit } from '../ee/project-plan/tasks-limit'
import { stepFileService } from '../file/step-file/step-file.service'
import { flowService } from '../flows/flow/flow.service'
import { engineResponseWatcher } from '../workers/engine-response-watcher'
import { jobQueue } from '../workers/queue'
import { getJobPriority } from '../workers/queue/queue-manager'
import { webhookSimulationService } from './webhook-simulation/webhook-simulation-service'

const WEBHOOK_TIMEOUT_MS = system.getNumberOrThrow(AppSystemProp.WEBHOOK_TIMEOUT_SECONDS) * 1000

export const webhookController: FastifyPluginAsyncTypebox = async (app) => {

    app.all(
        '/:flowId/sync',
        WEBHOOK_PARAMS,
        async (request: FastifyRequest<{ Params: WebhookUrlParams }>, reply) => {
            const response = await handleWebhook({
                request,
                flowId: request.params.flowId,
                async: false,
                flowVersionToRun: GetFlowVersionForWorkerRequestType.LOCKED,
                saveSampleData: await webhookSimulationService(request.log).exists(
                    request.params.flowId,
                ),
            })
            await reply
                .status(response.status)
                .headers(response.headers)
                .send(response.body)
        },
    )

    app.all(
        '/:flowId',
        WEBHOOK_PARAMS,
        async (request: FastifyRequest<{ Params: WebhookUrlParams }>, reply) => {
            const response = await handleWebhook({
                request,
                flowId: request.params.flowId,
                async: true,
                saveSampleData: await webhookSimulationService(request.log).exists(
                    request.params.flowId,
                ),
                flowVersionToRun: GetFlowVersionForWorkerRequestType.LOCKED,
            })
            await reply
                .status(response.status)
                .headers(response.headers)
                .send(response.body)
        },
    )

    app.all('/:flowId/draft/sync', WEBHOOK_PARAMS, async (request, reply) => {
        const response = await handleWebhook({
            request,
            flowId: request.params.flowId,
            async: false,
            saveSampleData: true,
            flowVersionToRun: GetFlowVersionForWorkerRequestType.LATEST,
        })
        await reply
            .status(response.status)
            .headers(response.headers)
            .send(response.body)
    })

    app.all('/:flowId/draft', WEBHOOK_PARAMS, async (request, reply) => {
        const response = await handleWebhook({
            request,
            flowId: request.params.flowId,
            async: true,
            saveSampleData: true,
            flowVersionToRun: GetFlowVersionForWorkerRequestType.LATEST,
        })
        await reply
            .status(response.status)
            .headers(response.headers)
            .send(response.body)
    })

    app.all('/:flowId/test', WEBHOOK_PARAMS, async (request, reply) => {
        const response = await handleWebhook({
            request,
            flowId: request.params.flowId,
            async: true,
            saveSampleData: true,
            flowVersionToRun: undefined,
        })
        await reply
            .status(response.status)
            .headers(response.headers)
            .send(response.body)
    })

}

async function handleWebhook({
    request,
    flowId,
    async,
    saveSampleData,
    flowVersionToRun,
}: HandleWebhookParams): Promise<EngineHttpResponse> {
    const webhookHeader = 'x-webhook-id'
    const webhookRequestId = apId()
    const log = createWebhookContextLog({ log: request.log, webhookId: webhookRequestId, flowId })
    const flow = await flowService(log).getOneById(flowId)
    if (isNil(flow)) {
        log.info('Flow not found, returning GONE')
        return {
            status: StatusCodes.GONE,
            body: {},
            headers: {},
        }
    }
    await assertExceedsLimit(flow, log)
    if (
        flow.status !== FlowStatus.ENABLED &&
        !saveSampleData &&
        flowVersionToRun === GetFlowVersionForWorkerRequestType.LOCKED
    ) {
        return {
            status: StatusCodes.NOT_FOUND,
            body: {},
            headers: {
                [webhookHeader]: webhookRequestId,
            },
        }
    }

    log.info('Adding webhook job to queue')

    const synchronousHandlerId = async ? null : engineResponseWatcher(log).getServerId()
    await jobQueue(request.log).add({
        id: webhookRequestId,
        type: JobType.WEBHOOK,
        data: {
            projectId: flow.projectId,
            schemaVersion: LATEST_JOB_DATA_SCHEMA_VERSION,
            requestId: webhookRequestId,
            synchronousHandlerId,
            payload: await convertRequest(request, flow.projectId, flow.id),
            flowId: flow.id,
            saveSampleData,
            flowVersionToRun,
        },
        priority: await getJobPriority(synchronousHandlerId),
    })

    if (async) {
        log.info('Async webhook request completed')
        return {
            status: StatusCodes.OK,
            body: {},
            headers: {
                [webhookHeader]: webhookRequestId,
            },
        }
    }
    const flowHttpResponse = await engineResponseWatcher(log).oneTimeListener<EngineHttpResponse>(webhookRequestId, true, WEBHOOK_TIMEOUT_MS, {
        status: StatusCodes.NO_CONTENT,
        body: {},
        headers: {},
    })
    return {
        status: flowHttpResponse.status,
        body: flowHttpResponse.body,
        headers: {
            ...flowHttpResponse.headers,
            [webhookHeader]: webhookRequestId,
        },
    }
}

type HandleWebhookParams = {
    request: FastifyRequest
    flowId: string
    async: boolean
    saveSampleData: boolean
    flowVersionToRun: GetFlowVersionForWorkerRequestType.LATEST | GetFlowVersionForWorkerRequestType.LOCKED | undefined
}
async function convertRequest(
    request: FastifyRequest,
    projectId: string,
    flowId: string,
): Promise<EventPayload> {
    const payload: EventPayload = {
        method: request.method,
        headers: request.headers as Record<string, string>,
        body: await convertBody(request, projectId, flowId),
        queryParams: request.query as Record<string, string>,
    }
    return payload
}

const convertBody = async (
    request: FastifyRequest,
    projectId: string,
    flowId: string,
): Promise<unknown> => {
    if (request.isMultipart()) {
        const jsonResult: Record<string, unknown> = {}
        const requestBodyEntries = Object.entries(
            request.body as Record<string, unknown>,
        )

        for (const [key, value] of requestBodyEntries) {
            if (isMultipartFile(value)) {
                const file = await stepFileService(request.log).saveAndEnrich({
                    data: value.data as Buffer,
                    fileName: value.filename,
                    stepName: 'trigger',
                    flowId,
                    contentLength: value.data.length,
                    hostname: request.hostname,
                    projectId,
                })
                jsonResult[key] = file.url
            }
            else {
                jsonResult[key] = value
            }
        }
        return jsonResult
    }
    return request.body
}

async function assertExceedsLimit(flow: Flow, log: FastifyBaseLogger): Promise<void> {
    const exceededLimit = await tasksLimit(log).exceededLimit({
        projectId: flow.projectId,
    })
    if (exceededLimit) {
        log.info({
            message: 'disable webhook out of flow quota',
            projectId: flow.projectId,
            flowId: flow.id,
        })
        await flowService(log).updateStatus({
            id: flow.id,
            projectId: flow.projectId,
            newStatus: FlowStatus.DISABLED,
        })
    }

}

const WEBHOOK_PARAMS = {
    config: {
        allowedPrincipals: ALL_PRINCIPAL_TYPES,
        skipAuth: true,
    },
    schema: {
        params: WebhookUrlParams,
    },
}
