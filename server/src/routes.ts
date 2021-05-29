import { Router, Response } from 'express';
import { AuthController } from './controllers/AuthController';
import { BookController } from './controllers/BookController';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';
import authorization from './middleware/authorization';
import multer from 'multer';
import multerConfig from './config/multer.js'


const routes = Router();
const upload =  multer(multerConfig);

const authController = new AuthController();
const userController = new UserController();
const bookController = new BookController();
const sendMailController = new SendMailController();


//Router Autentication
routes.post('/auth', authController.authenticate);

//Routes User
routes.get('/users', userController.show);
routes.get('/users/:id', userController.findOne);
routes.post('/users', userController.create);
routes.post('/upload/:id', upload.single('file'), userController.updatePhoto);
routes.patch('/user-num-books/:id', userController.setNumBooks);
routes.patch('/user-points/:id', userController.setPoints);

//Routes Book
routes.get('/books', bookController.show);
routes.get('/books-search/:titol', bookController.searchBook);
routes.get('/books-user/:id', bookController.showBooksUser);
routes.get('/books/:id', bookController.getById);
routes.post('/books', bookController.create);
routes.post('/upload', upload.single('file'), bookController.getPhotoUrl);

//Routes email
routes.post('/email', sendMailController.execute);


export { routes };