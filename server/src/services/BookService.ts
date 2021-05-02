import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { BookRepository } from "../repositories/BookRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IBookCreate {
    name: string,
    author: string,
    isbn: string,
    year: Date,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number,
    user_id: string;
}

class BookService {
    async create ({
        name,
        author,
        isbn,
        year,
        genre,
        photo,
        book_status,
        book_note,
        user_id, 
    }: IBookCreate) {
        const bookRepository = getCustomRepository(BookRepository);
        const userRepository = getCustomRepository(UserRepository);
   
        const bookAlreadyExist = await bookRepository.findOne({ name });
        if (bookAlreadyExist) {
            throw new Error('Book already exists!');
        }

        const book = bookRepository.create({
            name,
            author,
            isbn,
            year: new Date(year),
            genre,
            photo,
            book_status,
            book_note,
            user_id
        });

        await bookRepository.save(book);

        return book;
    }
}

export { BookService }