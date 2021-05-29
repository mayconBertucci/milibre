import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
    private client: Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            host: 'smtp.umbler.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            }, 
            tls: {
                rejectUnauthorized: false
            } 
        });

        this.client = transporter; 
    }
    

    async execute(to: string, body: string, subject: string, nameTo: string, nameFrom: string) {
        const message = await this.client.sendMail({
            from: process.env.USER_EMAIL,
            to: 'mayconbertucci@gmail.com',
            subject: 'Hola',
            html: 'Hola Mundo!',
        });

        console.log(message);
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export default new SendMailService();