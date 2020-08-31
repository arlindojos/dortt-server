import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export default class deleteController {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const user = await prisma.users.findOne({
                where: {
                    id
                }
            })

            if(!user)
            return response.status(404).json({error: 'usuário não encontrado'});

            await prisma.users.delete({
                where: {
                    id
                }
            })

            return response.send('usuário apagado do banco com sucesso!');
        } catch (err) {
            response.status(400).json({error: 'Erro no delete'});
        }
    }
}