import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from 'express-validator';;
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class createUserController {
    async index(request: Request, response: Response) {
        const { emailUsr } = request.body;
        try {
            const user = await prisma.users.findOne({
                where: {
                    emailUsr
                },
                select: {
                    name: true,
                    surname: true,
                    emailUsr: true,
                    development: true,
                    websites: true,
                    createdAt: true
                }
            })
            if(!user) 
            return response.status(404).json({error: 'Usuário não encontrado'});

            return response.send(user);

        } catch (err) {
            response.status(400).send();
        }
    }

    async create(request: Request, response: Response) {
        const errors = validationResult(request);
        if (!errors.isEmpty())
        return response.status(422).json({ errors: errors.array() });


        const { name, surname, emailUsr, passwordUsr, websites, development } = request.body;

        try {
            const user = await prisma.users.findOne({
                where: {
                    emailUsr
                }
            })

            if(user)
            return response.status(423).json({error: 'Este email já esta em uso'})

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(passwordUsr, salt);

            prisma.users.create({
                data: {
                    name,
                    surname,
                    emailUsr,
                    passwordUsr: hashedPassword,
                    websites,
                    development
                },
                select: {
                    id: true
                }
            }).then(() => {
                response.send('Usuário salvo')
            })

        } catch (err) {
            response.status(400).json({error: 'Erro no cadastro'});
        }
    }
}