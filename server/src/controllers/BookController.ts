import { Request, Response } from "express";
import { BookService } from "../services/BookService";
import axios, { AxiosResponse } from 'axios';

interface IPhoto {
    items: [{
        volumeInfo: {
            title: string;
            imageLinks: {
                thumbnail: string;
            }
            averageRating: number;
        }
    }]
}

class BookController {
    async create(req: Request, res: Response) {
        try {
            const {
                titol,
                author,
                isbn,
                year,
                genre,
                book_status,
                user_id
            } = req.body;

            const bookService = new BookService();

            const response: AxiosResponse<IPhoto> = await axios({ method: 'get', url: `https://www.googleapis.com/books/v1/volumes?q=${titol}` });
            const name =  response.data.items[0].volumeInfo.title.toString();
            const photo = response.data.items[0].volumeInfo.imageLinks.thumbnail.toString();
            let book_note = response.data.items[0].volumeInfo.averageRating;

            if (book_note === undefined) {
                book_note = 0;
            }

            const book = await bookService.create({
                name,
                author,
                isbn,
                year,
                genre,
                photo,
                book_status,
                book_note,
                user_id,
            });

            return res.json(book);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const bookService = new BookService();
            const books = await bookService.find();
        
            return res.json(books);
            
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export { BookController }