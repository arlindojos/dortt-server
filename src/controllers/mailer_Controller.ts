import { Request, Response } from "express";
import mailer from '../modules/mailer';



export default class mailerController {
    async create(request: Request, response: Response) {
        const { name, phone, emailUsr, message, subject } = request.body;

        async function main() {

            await mailer.sendMail({
                from: '"Dortt" <arlindojosboa@gmail.com>', 
                to: "arlindojosboa@gmail.com",
                subject: subject,
                text: `Nome: ${name} Email: ${emailUsr} Telefone: ${phone} Mensagem: ${message}`, 
                html: `<b>Nome: ${name} <br/> Email: ${emailUsr} <br/> Telefone: ${phone} <br/> Mensagem: ${message}</b>`, 
            });
            response.send('Recebemos o seu email. Entraremos em contacto')
        }

        main().catch( (err) => {
            response.status(400).json({error: 'Não foi possível enviar o email. Por favor, tente novamente'});
        });
    }
}