import { MigrationInterface, QueryRunner } from 'typeorm'
import { logger } from 'server-shared'

export class CascadeProjectDeleteToActivity1710720610670 implements MigrationInterface {
    name = 'CascadeProjectDeleteToActivity1710720610670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity" DROP CONSTRAINT "fk_activity_project_id"
        `)
        await queryRunner.query(`
            ALTER TABLE "activity"
            ADD CONSTRAINT "fk_activity_project_id" FOREIGN KEY ("projectId") REFERENCES "project"("id")
                ON DELETE CASCADE ON UPDATE RESTRICT
        `)

        logger.info({ name: this.name }, 'up')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "activity" DROP CONSTRAINT "fk_activity_project_id"
        `)
        await queryRunner.query(`
            ALTER TABLE "activity"
            ADD CONSTRAINT "fk_activity_project_id" FOREIGN KEY ("projectId") REFERENCES "project"("id")
                ON DELETE RESTRICT ON UPDATE RESTRICT
        `)
        logger.info({ name: this.name }, 'down')
    }
}