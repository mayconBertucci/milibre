import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Book } from "./Book";


@Entity('user')
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthday: Date;

    @Column()
    photo: string;

    @Column()
    location: string;

    @Column()
    points: number;

    @Column()
    favorite_book: string;

    @Column()
    favorite_author: string;

    @Column()
    num_books: number;

    @JoinColumn({ name: 'contact_id' })
    @OneToMany(type => User, user => user.contacts)
    contacts: User[];
    
    @OneToMany(type => Book, book => book.user)
    book: Book[];

    @Column()
    contact_id: string;

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

export { User }