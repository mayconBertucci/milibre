import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";


@Entity('book')
class Book {
    @PrimaryColumn()
    id: string;

    @Column()
    titol: string;

    @Column()
    author: string;

    @Column()
    isbn: string;

    @Column()
    description: string;

    @Column()
    genre: string;

    @Column()
    photo: string;

    @Column()
    book_status: string;

    @Column()
    book_note: number;
    
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(type => User, user => user.book)
    user: User;

    @Column()
    user_id: string;
    
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