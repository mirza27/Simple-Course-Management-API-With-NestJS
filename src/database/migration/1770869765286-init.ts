import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770869765286 implements MigrationInterface {
    name = 'Init1770869765286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "name" character varying NOT NULL, "description" text, "year" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_courses" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "course_id" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6f510facd7ff988d3a85552d9a4" UNIQUE ("user_id", "course_id"), CONSTRAINT "PK_0802c48ad82a16822bd7041154a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_auth" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "refresh_token" text NOT NULL, "expired_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_56d00ec31dc3eed1c3f6bff4f58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d887e2dcbfe0682c46c055f93d" ON "user_auth" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e4c260fe6bb1131707c4617f745" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "FK_7ecb10d15b858768c36d37727f9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "FK_d65a2771413a10753d76937b3d6" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_auth" ADD CONSTRAINT "FK_d887e2dcbfe0682c46c055f93d6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_auth" DROP CONSTRAINT "FK_d887e2dcbfe0682c46c055f93d6"`);
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "FK_d65a2771413a10753d76937b3d6"`);
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "FK_7ecb10d15b858768c36d37727f9"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e4c260fe6bb1131707c4617f745"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d887e2dcbfe0682c46c055f93d"`);
        await queryRunner.query(`DROP TABLE "user_auth"`);
        await queryRunner.query(`DROP TABLE "user_courses"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
