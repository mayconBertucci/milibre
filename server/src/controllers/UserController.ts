import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

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
                user_note,
                points,
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
                user_note,
                points,
                favorite_book,
                current_book,
                favorite_author,
            });

            return res.json(user.id);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }  
    
    async findOne(req: Request, res: Response) {
        try {
            const userRepository = getCustomRepository(UserRepository);

            const id = req.params.id;
            const user = await userRepository.findOneOrFail({ id: id });
            console.log(user);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export { UserController }