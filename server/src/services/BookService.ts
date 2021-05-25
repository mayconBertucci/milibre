import { getCustomRepository } from "typeorm";
import { BookRepository } from "../repositories/BookRepository";

interface IBookCreate {
    titol: string,
    author: string,
    isbn: string,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number,
    user_id: string;
}

class BookService {
    async create ({
        titol,
        author,
        isbn,
        genre,
        photo,
        book_status,
        book_note,
        user_id, 
    }: IBookCreate) {
        const bookRepository = getCustomRepository(BookRepository);
    
        const book = bookRepository.create({
            titol,
            author,
            isbn,
            genre,
            photo,
            book_status,
            book_note,
            user_id
        });

        await bookRepository.save(book);

        return book;
    }

    async find() {
        const bookRepository = getCustomRepository(BookRepository);
        const books = await bookRepository.find({ relations: ["user"] });
    
        return books;
    }
}

export { BookService }