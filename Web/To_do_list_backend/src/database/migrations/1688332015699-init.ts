import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688332015699 implements MigrationInterface {
    name = 'Init1688332015699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(255) NOT NULL, \`conclusion\` tinyint NOT NULL, \`deadline\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`taskListsId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(56) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`taskList\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`share\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accepted\` tinyint NOT NULL, \`invite_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`taskListsId\` varchar(36) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a175363c2a1175f22ed36b4399f\` FOREIGN KEY (\`taskListsId\`) REFERENCES \`taskList\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`taskList\` ADD CONSTRAINT \`FK_dfe093f3246bc267e00f0c7d54c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share\` ADD CONSTRAINT \`FK_7cd7b823095a0c0509c9d350d95\` FOREIGN KEY (\`taskListsId\`) REFERENCES \`taskList\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`share\` ADD CONSTRAINT \`FK_07e293248ed4aeb7965af840b13\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`share\` DROP FOREIGN KEY \`FK_07e293248ed4aeb7965af840b13\``);
        await queryRunner.query(`ALTER TABLE \`share\` DROP FOREIGN KEY \`FK_7cd7b823095a0c0509c9d350d95\``);
        await queryRunner.query(`ALTER TABLE \`taskList\` DROP FOREIGN KEY \`FK_dfe093f3246bc267e00f0c7d54c\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a175363c2a1175f22ed36b4399f\``);
        await queryRunner.query(`DROP TABLE \`share\``);
        await queryRunner.query(`DROP TABLE \`taskList\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
