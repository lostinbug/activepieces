import { PieceMetadata, PieceMetadataModel } from '@activepieces/pieces-framework'
import { logger, SharedSystemProp, system, UserInteractionJobType } from '@activepieces/server-shared'
import {
    ActivepiecesError,
    AddPieceRequestBody,
    ApEdition,
    EngineResponseStatus,
    ErrorCode,
    ExecuteExtractPieceMetadata,
    ExecutionMode,
    FileCompression,
    FileId,
    FileType,
    isNil,
    PackageType,
    PiecePackage,
    PieceScope,
    PieceType,
    PlatformId,
    ProjectId,
} from '@activepieces/shared'
import { EngineHelperExtractPieceInformation, EngineHelperResponse } from 'server-worker'
import { fileService } from '../../file/file.service'
import { userInteractionWatcher } from '../../workers/user-interaction-watcher'
import { pieceMetadataService } from '../piece-metadata-service'

export const pieceService = {
    async installPiece(
        platformId: string,
        projectId: string | undefined,
        params: AddPieceRequestBody,
    ): Promise<PieceMetadataModel> {
        assertInstallProjectEnabled(params.scope)
        try {
            const piecePackage = await savePiecePackage(platformId, projectId, params)
            const pieceInformation = await extractPieceInformation(piecePackage, projectId, platformId)
            const archiveId = piecePackage.packageType === PackageType.ARCHIVE ? piecePackage.archiveId : undefined
            const savedPiece = await pieceMetadataService.create({
                pieceMetadata: {
                    ...pieceInformation,
                    minimumSupportedRelease:
                        pieceInformation.minimumSupportedRelease ?? '0.0.0',
                    maximumSupportedRelease:
                        pieceInformation.maximumSupportedRelease ?? '999.999.999',
                    name: pieceInformation.name,
                    version: pieceInformation.version,
                },
                projectId: params.scope === PieceScope.PROJECT ? projectId : undefined,
                packageType: params.packageType,
                platformId,
                pieceType: PieceType.CUSTOM,
                archiveId,
            })

            return savedPiece
        }
        catch (error) {
            logger.error(error, '[PieceService#add]')

            if ((error as ActivepiecesError).error.code === ErrorCode.VALIDATION) {
                throw error
            }
            throw new ActivepiecesError({
                code: ErrorCode.ENGINE_OPERATION_FAILURE,
                params: {
                    message: JSON.stringify(error),
                },
            })
        }
    },
}

const assertInstallProjectEnabled = (scope: PieceScope): void => {
    if (scope === PieceScope.PROJECT) {
        const sandboxMode = system.getOrThrow(SharedSystemProp.EXECUTION_MODE)
        const edition = system.getEdition()
        if (
            sandboxMode === ExecutionMode.UNSANDBOXED &&
            [ApEdition.ENTERPRISE, ApEdition.CLOUD].includes(edition)
        ) {
            throw new ActivepiecesError({
                code: ErrorCode.AUTHORIZATION,
                params: {
                    message:
                        'Project pieces are not supported in this edition with unsandboxed execution mode',
                },
            })
        }
    }
}

async function savePiecePackage(platformId: string | undefined, projectId: string | undefined, params: AddPieceRequestBody): Promise<PiecePackage> {
    switch (params.packageType) {
        case PackageType.ARCHIVE: {
            const archiveId = await saveArchive({
                projectId: params.scope === PieceScope.PROJECT ? projectId : undefined,
                platformId,
                archive: params.pieceArchive.data as Buffer,
            })
            return {
                ...params,
                pieceType: PieceType.CUSTOM,
                archiveId,
                archive: undefined,
                packageType: params.packageType,
            }
        }

        case PackageType.REGISTRY: {
            return {
                ...params,
                pieceType: PieceType.CUSTOM,
            }
        }
    }
}

const extractPieceInformation = async (request: ExecuteExtractPieceMetadata, projectId: string | undefined, platformId: string): Promise<PieceMetadata> => {
    const engineResponse = await userInteractionWatcher.submitAndWaitForResponse<EngineHelperResponse<EngineHelperExtractPieceInformation>>({
        jobType: UserInteractionJobType.EXECUTE_EXTRACT_PIECE_INFORMATION,
        piece: request,
        projectId,
        platformId,
    })

    if (engineResponse.status !== EngineResponseStatus.OK) {
        throw new Error(engineResponse.standardError)
    }
    return engineResponse.result
}

const saveArchive = async (
    params: GetPieceArchivePackageParams,
): Promise<FileId> => {
    const { projectId, platformId, archive } = params

    const archiveFile = await fileService.save({
        projectId: isNil(platformId) ? projectId : undefined,
        platformId,
        data: archive,
        size: archive.length,
        type: FileType.PACKAGE_ARCHIVE,
        compression: FileCompression.NONE,
    })

    return archiveFile.id
}

type GetPieceArchivePackageParams = {
    archive: Buffer
    projectId?: ProjectId
    platformId?: PlatformId
}
