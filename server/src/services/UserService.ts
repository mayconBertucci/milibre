import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

import bcrypt from 'bcrypt';

interface IUserCreate {
    name: string,
    email: string,
    password: string,
    photo: string,
    birthday: Date,
    location: string,
    favorite_book: string,
    favorite_author: string,
}

class UserService {
    async create({
        name,
        email,
        password,
        birthday,
        location,
        favorite_book,
        favorite_author,
    }: IUserCreate) {
        const userRepository = getCustomRepository(UserRepository);
        
        const userAlreadyExist = await userRepository.findOne({ email });

        if (userAlreadyExist) {
            throw new Error('Este e-mail ya se encuentra registrado!');
        }

        const passwordBcrypt = await bcrypt.hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: passwordBcrypt,
            birthday: new Date(birthday),
            location,
            points: 0,
            num_books: 0,
            favorite_book,
            favorite_author,
        });
        await userRepository.save(user);

        return user;
    }

    async update(userUpdate: IUserCreate){
        const userRepository = getCustomRepository(UserRepository);

        const user = userRepository.create(userUpdate);
        await userRepository.save(user);
        
        return user;
    }; 
}

export { UserService }