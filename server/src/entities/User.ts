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

    @Column({
        nullable: true
    })
    photo: string;

    @Column()
    location: string;

    @Column({ 
        type: "float" ,
        nullable: true
    })
    points: number;

    @Column({
        nullable: true
    })
    favorite_book: string;

    @Column({
        nullable: true
    })
    favorite_author: string;

    @Column({ 
        type: "int",
        nullable: true
    })
    num_books: number;

    @JoinColumn({ name: 'contact_id' })
    @OneToMany(type => User, user => user.contacts)
    contacts: User[];
    
    @OneToMany(type => Book, book => book.user)
    book: Book[];

    @Column({
        nullable: true
    })
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