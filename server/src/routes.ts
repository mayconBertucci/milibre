import { response, Router } from 'express';
import { BookController } from './controllers/BookController';
import { UserController } from './controllers/UserController';

const routes = Router();

const userController = new UserController();
const bookController = new BookController();

//Routes User
routes.get('/users', userController.show);
routes.get('/users/:id', userController.findOne);
routes.post('/users', userController.create);

//Routes Book
routes.get('/books', bookController.show);
routes.post('/books', bookController.create);

export { routes };