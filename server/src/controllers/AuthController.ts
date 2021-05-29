import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class AuthController {
    async authenticate(req: Request, res: Response) {
       try {
            const repository = getRepository(User);
            const { email, password } = req.body;

            const user = await repository.findOne({ email: email });

            if(!user) {
                throw new Error("Este email no está registrado");
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword) {
                throw new Error("Contraseña incorrecta");
            }

            const token = jwt.sign({ 
                id: user.id,
                email: email,
                name: user.name 
            }, process.env.JWT_SECRET);
    
            return res.json({ user, token });
       } catch (error) {
            return res.status(400).json({ message: error.message });
       }
    }

}

export { AuthController };