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
                        name: 'name',
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
                        name: 'year',
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
                        type: 'double',
                        default: 0
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('book');
    }

}
