import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1619179670138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'photo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'location',
                        type: 'varchar',
                    },
                    {
                        name: 'points',
                        type: 'number',
                        default: 0
                    },
                    {
                        name: 'favorite_book',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'favorite_author',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'birthday',
                        type: 'Date'
                    },
                    {
                        name: 'num_books',
                        type: 'number',
                        default: 0
                    },
                    {
                        name: 'contact_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKContact',
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        columnNames: ['contact_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
