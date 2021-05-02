import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface IUserCreate {
    name: string,
    email: string,
    password: string,
    birthday: Date,
    photo: string,
    location: string,
    user_note: number,
    points: number,
    favorite_book: string,
    current_book: string,
    favorite_author: string,
    contact_id: string
}

class UserService {
    async create({
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
        contact_id
    }: IUserCreate) {
        const userRepository = getCustomRepository(UserRepository);
        
        const userAlreadyExist = await userRepository.findOne({ email });

        if (userAlreadyExist) {
            throw new Error('User already exists!');
        }

        const user = userRepository.create({
            name,
            email,
            password,
            birthday: new Date(birthday),
            photo,
            location,
            user_note,
            points,
            favorite_book,
            current_book,
            favorite_author,
            contact_id
        });
        await userRepository.save(user);

        return user;
    }
}

export { UserService }