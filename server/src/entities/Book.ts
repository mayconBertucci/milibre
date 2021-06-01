import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";


@Entity('book')
class Book {
    @PrimaryColumn()
    id: string;

    @Column()
    titol: string;

    @Column({
        nullable: true
    })
    author: string;

    @Column({
        nullable: true
    })
    isbn: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        nullable: true
    })
    genre: string;

    @Column({
        nullable: true
    })
    photo: string;

    @Column({
        nullable: true
    })
    book_status: string;

    @Column({ type: "float" })
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