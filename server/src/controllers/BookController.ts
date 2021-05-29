import { Request, Response } from "express";
import { BookService } from "../services/BookService";
import axios, { AxiosResponse } from 'axios';
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";

interface MulterRequest extends Request {
    file: any;
}

interface IPhoto {
    volumeInfo: {
        title: string;
        industryIdentifiers: [{
            identifier: string;
        }]
        imageLinks: {
            thumbnail: string;
        }
        authors: [string];
        categories: [string];
        averageRating: number;
        description: string;
    }
}

class BookController {
    async create(req: Request, res: Response) {
        try {
            const {
                id,
                status,
                user_id
            } = req.body;

            const bookService = new BookService();

            const response: AxiosResponse<IPhoto> = await axios({ method: 'get', url: `https://www.googleapis.com/books/v1/volumes/${id}` });
           
            let book_note = response.data.volumeInfo.averageRating;
            if (book_note === undefined) {
                book_note = 0;
            }

            let book_status: string;
            !status ? book_status = 'Nuevo' : book_status = status;

            let img: string; 
            response.data.volumeInfo.imageLinks !== undefined 
                ? img = response.data.volumeInfo.imageLinks.thumbnail.toString()
                : img = 'img/Photos_re_pvh3.svg';
        
            let categories: string;
            response.data.volumeInfo.categories !== undefined 
                ? categories = response.data.volumeInfo.categories[0].toString()
                : categories = '';

            let authorTemp: string;
            response.data.volumeInfo.authors !== undefined 
                ? authorTemp = response.data.volumeInfo.authors[0].toString()
                : authorTemp = '';

            let identifier: string;
            response.data.volumeInfo.industryIdentifiers !== undefined 
                ? identifier = response.data.volumeInfo.industryIdentifiers[0].identifier.toString()
                : identifier = '';

            let description: string;
            response.data.volumeInfo.description !== undefined 
                ? description = response.data.volumeInfo.description.toString()
                : description = '';

            const book = await bookService.create({
                titol: response.data.volumeInfo.title.toString(),
                author: authorTemp,
                isbn: identifier,
                genre: categories,
                photo: img,
                book_status,
                book_note,
                description,
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

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const bookService = new BookService();
            const books = await bookService.findById(id);
            
            return res.json(books);
            
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async showBooksUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const books = await getRepository(Book)
                .createQueryBuilder('book')
                .where('book.user_id = :id', { id })
                .getMany();
            return res.json(books);
            
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getPhotoUrl(req: MulterRequest, res: Response) {
        const { location: url = "" } = req.file;

        return res.status(200).json(url);
    }

    async searchBook(req: MulterRequest, res: Response) {
        try {
            const titol = req.params.titol;

            const books = await getRepository(Book)
                .createQueryBuilder('book')
                .leftJoinAndSelect('book.user', 'user')
                .where('LOWER(book.titol) LIKE LOWER(:titol)', { titol: `%${titol}%` })
                .getMany();
            return res.json(books);

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export { BookController }