import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient;

export default class resetPasswordController {
    async create(request: Request, response: Response) {
        const { passwordResetToken, emailUsr, passwordUsr } = request.body;

        try {
            const user = await prisma.users.findOne({
                where: {
                    emailUsr: emailUsr
                },
                select: {
                    id: true,
                    passwordResetToken: true,
                    passwordResetExpires: true
                }
            })

            if(!user) 
            return response.status(404).json({error: 'usuário não encontrado, verifique o seu email.'});

            if(passwordResetToken !== user.passwordResetToken)
            return response.status(404).json({error: 'Erro. Token invalido'});

            const now = new Date();

            if(user.passwordResetExpires)
            if(now > user.passwordResetExpires)
            return response.status(404).json({error: 'Link expirado, faça uma nova solicitação de recuperação de senha'});

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(passwordUsr, salt);

            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    passwordUsr: hashedPassword
                }
            })

            response.send('Sucesso! A sua senha da conta Dortt foi atualizada, Click Log in para continuar.')

        } catch (err) {
            response.status(400).json({error: 'Não foi possível recuperar a senha. Por favor, tente novamente'})
        }
    }
}