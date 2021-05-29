import { Request, Response } from "express";
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(req: Request, res: Response) {
        try {
            const { to, subject, body, nameTo, nameFrom } = req.body;
            
            await SendMailService.execute(to, subject, body, nameTo, nameFrom);
        } catch (error) {
            res.send(error);
        }
    }
}

export { SendMailController }