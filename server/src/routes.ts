import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { BookController } from './controllers/BookController';
import { UserController } from './controllers/UserController';
import authorization from './middleware/authorization';
import multer from 'multer';
import multerConfig from './config/multer.js'


const routes = Router();
const upload =  multer(multerConfig);

const authController = new AuthController();
const userController = new UserController();
const bookController = new BookController();


//Router Autentication
routes.post('/auth', authController.authenticate);

//Routes User
routes.get('/users', userController.show);
routes.get('/users/:id', authorization, userController.findOne);
routes.post('/users', userController.create);
routes.post('/upload/:id', upload.single('file'), userController.updatePhoto);

//Routes Book
routes.get('/books', bookController.show);
routes.post('/books',  authorization, bookController.create);

export { routes };