import { exceptionHandler } from '@activepieces/server-shared'
import {
    ActivepiecesError,
    ErrorCode,
    FlowId,
    FlowOperationRequest,
    FlowOperationType,
    flowStructureUtil,
    FlowVersion,
    isNil,
    ProjectId,
} from '@activepieces/shared'
import { FastifyBaseLogger } from 'fastify'
import { webhookSimulationService } from '../../webhooks/webhook-simulation/webhook-simulation-service'
import { sampleDataService } from '../step-run/sample-data.service'

type OnApplyOperationParams = {
    projectId: ProjectId
    flowVersion: FlowVersion
    operation: FlowOperationRequest
}

type DeleteWebhookSimulationParams = {
    projectId: ProjectId
    flowId: FlowId
}

const deleteWebhookSimulation = async (
    params: DeleteWebhookSimulationParams,
    log: FastifyBaseLogger, 
): Promise<void> => {
    const { projectId, flowId } = params

    try {
        await webhookSimulationService(log).delete({
            projectId,
            flowId,
        })
    }
    catch (e: unknown) {
        const notWebhookSimulationNotFoundError = !(
            e instanceof ActivepiecesError &&
            e.error.code === ErrorCode.ENTITY_NOT_FOUND
        )
        if (notWebhookSimulationNotFoundError) {
            throw e
        }
    }
}

export const flowVersionSideEffects = (log: FastifyBaseLogger) => ({
    async preApplyOperation({
        projectId,
        flowVersion,
        operation,
    }: OnApplyOperationParams): Promise<void> {
        try {
            await handleSampleDataDeletion(projectId, flowVersion, operation, log)
            await handleUpdateTriggerWebhookSimulation(projectId, flowVersion, operation, log)
        }
        catch (e) {
            // Ignore error and continue the operation peacefully
            exceptionHandler.handle(e)
        }
    },
})

async function handleSampleDataDeletion(projectId: ProjectId, flowVersion: FlowVersion, operation: FlowOperationRequest, log: FastifyBaseLogger): Promise<void> {
    if (operation.type !== FlowOperationType.UPDATE_TRIGGER && operation.type !== FlowOperationType.DELETE_ACTION) {
        return
    }
    const stepToDelete = flowStructureUtil.getStepOrThrow(operation.request.name, flowVersion.trigger)
    const triggerChanged = operation.type === FlowOperationType.UPDATE_TRIGGER && (flowVersion.trigger.type !== operation.request.type 
        || flowVersion.trigger.settings.triggerName !== operation.request.settings.triggerName
        || flowVersion.trigger.settings.pieceName !== operation.request.settings.pieceName)
    
    const actionDeleted = operation.type === FlowOperationType.DELETE_ACTION
    const deleteSampleData = triggerChanged || actionDeleted
    const sampleDataExists = !isNil(stepToDelete?.settings.inputUiInfo?.sampleDataFileId)
    if (deleteSampleData && sampleDataExists) {
        await sampleDataService(log).deleteForStep({
            projectId,
            flowVersionId: flowVersion.id,
            flowId: flowVersion.flowId,
            sampleDataFileId: stepToDelete.settings.inputUiInfo.sampleDataFileId,
        })
    }
}

async function handleUpdateTriggerWebhookSimulation(projectId: ProjectId, flowVersion: FlowVersion, operation: FlowOperationRequest, log: FastifyBaseLogger): Promise<void> {
    if (operation.type === FlowOperationType.UPDATE_TRIGGER) {
        await deleteWebhookSimulation({
            projectId,
            flowId: flowVersion.flowId,
        }, log)
    }
}
