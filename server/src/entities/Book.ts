import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity('book')
class Book {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    isbn: string;

    @Column()
    year: Date;

    @Column()
    genre: string;

    @Column()
    photo: string;

    @Column()
    book_status: string;

    @Column()
    book_note: number;
    
    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Book }