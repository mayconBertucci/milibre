import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BookRepository } from "../repositories/BookRepository";
import { BookService } from "../services/BookService";

class BookController {
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                author,
                isbn,
                year,
                genre,
                photo,
                book_status,
                book_note
            } = req.body;

            const bookService = new BookService();
        
            const book = await bookService.create({
                name,
                author,
                isbn,
                year,
                genre,
                photo,
                book_status,
                book_note
            });


            return res.json(book.id);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const bookRepository = getCustomRepository(BookRepository);
        
            const all = await bookRepository.find();
            return res.json(all);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export { BookController }