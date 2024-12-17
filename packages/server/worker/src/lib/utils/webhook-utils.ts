import { WebhookResponse } from '@activepieces/pieces-framework'
import {
    networkUtls,
    rejectedPromiseHandler,
} from '@activepieces/server-shared'
import {
    EventPayload,
    FlowId,
    FlowVersion,
    PopulatedFlow,
    TriggerType,
} from '@activepieces/shared'
import { FastifyBaseLogger } from 'fastify'
import { workerApiService } from '../api/server-api.service'
import { triggerConsumer } from '../trigger/hooks/trigger-consumer'

export const webhookUtils = (log: FastifyBaseLogger) => ({
    async getWebhookPrefix(): Promise<string> {
        return `${await networkUtls.getPublicUrl()}v1/webhooks`
    },
    async getAppWebhookUrl({
        appName,
    }: {
        appName: string
    }): Promise<string | undefined> {
        const frontendUrl = await networkUtls.getPublicUrl()
        return `${frontendUrl}v1/app-events/${appName}`
    },
    async getWebhookUrl({
        flowId,
        simulate,
    }: GetWebhookUrlParams): Promise<string> {
        const suffix: WebhookUrlSuffix = simulate ? '/test' : ''
        const webhookPrefix = await this.getWebhookPrefix()
        return `${webhookPrefix}/${flowId}${suffix}`
    },
    async extractPayload({
        flowVersion,
        payload,
        projectId,
        engineToken,
        simulate,
    }: ExtractPayloadParams): Promise<unknown[]> {
        if (flowVersion.trigger.type === TriggerType.EMPTY) {
            log.warn({
                flowVersionId: flowVersion.id,
            }, '[WebhookUtils#extractPayload] empty trigger, skipping')
            return []
        }
        log.info({
            flowVersionId: flowVersion.id,
            simulate,
        }, '[WebhookUtils#extractPayload] extracting payloads')
        return triggerConsumer.extractPayloads(
            engineToken,
            log,
            {
                projectId,
                flowVersion,
                payload,
                simulate,
            },
        )
    },
    savePayloadsAsSampleData({
        flowVersion,
        projectId,
        workerToken,
        payloads,
    }: SaveSampleDataParams): void {
        rejectedPromiseHandler(
            workerApiService(workerToken).savePayloadsAsSampleData({
                flowId: flowVersion.flowId,
                projectId,
                payloads,
            }),
        )
    },

    async handshake({
        populatedFlow,
        payload,
        engineToken,
    }: HandshakeParams): Promise<WebhookResponse | null> {
        log.info(`[WebhookService#handshake] flowId=${populatedFlow.id}`)
        const { projectId } = populatedFlow
        const response = await triggerConsumer.tryHandshake(engineToken, {
            engineToken,
            projectId,
            flowVersion: populatedFlow.version,
            payload,
        }, log)
        if (response !== null) {
            log.info(`[WebhookService#handshake] condition met, handshake executed, response:
            ${JSON.stringify(response, null, 2)}`)
        }
        return response
    },
})

type HandshakeParams = {
    populatedFlow: PopulatedFlow
    payload: EventPayload
    engineToken: string
}

type WebhookUrlSuffix = '' | '/test'

type GetWebhookUrlParams = {
    flowId: FlowId
    simulate?: boolean
}

type ExtractPayloadParams = {
    engineToken: string
    projectId: string
    flowVersion: FlowVersion
    payload: EventPayload
    simulate: boolean
}

type SaveSampleDataParams = {
    flowVersion: FlowVersion
    projectId: string
    workerToken: string
    payloads: unknown[]
}
