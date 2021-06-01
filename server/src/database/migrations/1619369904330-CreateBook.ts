import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBook1619369904330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'book',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'titol',
                        type: 'varchar'
                    },
                    {
                        name: 'author',
                        type: 'varchar'
                    },
                    {
                        name: 'isbn',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'genre',
                        type: 'varchar'
                    },
                    {
                        name: 'photo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'book_status',
                        type: 'varchar'
                    },
                    {
                        name: 'book_note',
                        type: 'float',
                        default: 0
                    },
                    {
                        name: 'user_id',
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
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKUser',
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('book');
    }

}
