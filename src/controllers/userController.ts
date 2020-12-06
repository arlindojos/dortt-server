import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import userViews from '../views/userViews';

import validator from '../errors/validator';

const prisma = new PrismaClient();

export default class createUserController {
  async index(request: Request, response: Response) {
    const { emailUsr, passwordUsr } = request.body;
    
    const user = await prisma.users.findOne({ where: {emailUsr} });
    
    if(!user) 
    return response.status(404).json({error: 'Usuário não encontrado'});

    if(!bcrypt.compareSync(passwordUsr, user.passwordUsr))
    return response.status(400).json({error: 'palavra-chave invalida'});
    
    response.status(200).json(userViews.render(user));
  }

  async update(request: Request, response: Response) {
    const { passwordResetToken, emailUsr, passwordUsr } = request.body;

    const user = await prisma.users.findOne({
      where: { emailUsr: emailUsr}
    })

    if(!user) 
    return response.status(404).json({ error: 'usuário não encontrado, verifique o seu email.'});

    if(passwordResetToken !== user.passwordResetToken)
    return response.status(404).json({error: 'Erro. Link invalido'});

    const now = new Date();

    if(user.passwordResetExpires)
    if(now > user.passwordResetExpires)
    return response.status(404).json({error: 'Link expirado, faça uma nova solicitação de recuperação de senha'});

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(passwordUsr, salt);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        passwordUsr: hashedPassword
      }
    })

    response.send(`Sucesso! A sua senha da conta Dortt foi atualizada, Click Log In para continuar.`)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.users.findOne({ where: { id } })
    
    if(!user)
    return response.status(404).json({error: 'usuário não encontrado'});
    
    await prisma.users.delete({ where: { id }})
    
    response.send('usuário apagado do banco com sucesso!');
  }
  
  async create(request: Request, response: Response) {

    const { 
      name,
      surname, 
      emailUsr, 
      passwordUsr,
      websites, 
      development 
    } = request.body;

    validator.user(
      name,
      surname, 
      emailUsr, 
      passwordUsr,
      websites, 
      development
    )

    const user = await prisma.users.findOne({ where: {emailUsr} })

    if(user)
    return response.status(400).json({error: 'Este email já esta em uso'})

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(passwordUsr, salt);

    const newUser = await prisma.users.create({
      data: {
        name,
        surname,
        emailUsr,
        passwordUsr: hashedPassword,
        websites,
        development
      }
    })
    
    response.status(201).json(userViews.render(newUser));
  }
}