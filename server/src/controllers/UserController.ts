import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

interface MulterRequest extends Request {
    file: any;
}

class UserController {
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                email,
                password,
                birthday,
                photo,
                location,
                favorite_book,
                current_book,
                favorite_author,
            } = req.body;

            const userService = new UserService();

            const user = await userService.create({
                name,
                email,
                password,
                birthday,
                photo,
                location,
                favorite_book,
                current_book,
                favorite_author,
            });

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }  

    async show(req: Request, res: Response) {
        try {
            const userRepository = getCustomRepository(UserRepository);
        
            const all = await userRepository.find();
            return res.json(all);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    
    async findOne(req: Request, res: Response) {
        try {
            const userRepository = getCustomRepository(UserRepository);

            const id = req.params.id;
            const user = await userRepository.findOneOrFail({ id: id });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updatePhoto(req: MulterRequest, res: Response) {
        try {
            const { originalname: name, size, key, location: url = "" } = req.file;
            
            const userRepository = getCustomRepository(UserRepository);

            const id = req.params.id;
            const user = await userRepository.findOneOrFail({ id: id });
            user.photo = url;

            const userService = new UserService();
            return res.status(200).json(userService.update(user));
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export { UserController }