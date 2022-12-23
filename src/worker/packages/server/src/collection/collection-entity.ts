import { Entity, EntitySchema} from "typeorm"
import {ApIdSchema, BaseColumnSchemaPart} from "../helper/base-entity";
import {ProjectId} from "shared/dist/model/project";
import {Collection, CollectionId, CollectionVersion, Project} from "shared";

export class CollectionSchema implements Collection {
    id: CollectionId;
    project: Project;
    versions: CollectionVersion[];
    created: number;
    projectId: ProjectId;
    updated: number;
}

export const CollectionEntity = new EntitySchema<CollectionSchema>({
    name: "collection",
    columns: {
        ...BaseColumnSchemaPart,
        projectId: ApIdSchema,
    },
    indices: [
        {
            name: 'idx_collection_project_id',
            columns: ['projectId'],
            unique: false
        }
    ],
    relations: {
        project: {
            type: 'many-to-one',
            target: 'project',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'projectId',
                foreignKeyConstraintName: "fk_collection_project_id",
            },
        },
        versions: {
            type: "one-to-many",
            target: "collection_version",
            inverseSide: 'collection'
        },
    }
})
