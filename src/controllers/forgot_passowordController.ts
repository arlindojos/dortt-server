import  { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import crypto from 'crypto';
import mailer from '../modules/mailer';

const prisma = new PrismaClient;

export default class forgotPasswordController {

    async create(request: Request, response: Response) { 

        const { emailUsr } = request.body

      try {
        const user = await prisma.users.findOne({ 
           where: { emailUsr: emailUsr },
           select: {
               id: true
           }
        });

        if(!user)
        return response.status(404).json({error: 'usuário não encontrado, verifique o seu email.'});

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        await mailer.sendMail({
            from: '"Dortt" <arlindojosboa@gmail.com>', 
            to: "arlindojosboa@gmail.com",
            subject: 'Recuperar senha',
            text: `Recuperar senha. Foi acionado o evento de recuperação de senha. A janela de recuperação de senha é limitada a uma horas. Se não recuperar a tua senha dentro de uma hora terá de submeter novo pedido. Para completar o processo visite o link: http://localhost:3000/password/${token} . Usuário: ${emailUsr}`, 
            html:  ` <b>
                        <h3><strong>Recuperar senha</strong></h3>
                        <p>Foi acionado o evento de recuperação de senha. A janela de recuperação de senha é limitada a uma horas. <br> Se não recuperar a tua senha dentro de uma hora terá de submeter novo pedido.</p> 
                        <p>Para completar o processo visite o link abaixo: <br> http://localhost:3000/password/${token}</p> 
                        Usuário: ${emailUsr}
                    </>`,                   
        }, (err) => {
            if(err)
            return response.status(400).json({error: 'Não pôde enviar email. Por favor, tente novamente'});
        })

        response.send('Por favor vejá o seu email inbox para completar o processo.');

      } catch (err) {

        response.status(400).json({error: 'Erro na recuperação de palavra-chave. Por favor, tente novamente'});
      }
    }
}

