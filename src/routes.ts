import express from 'express';
import ForgotPasswordController from './controllers/forgot_passowordController';
import ResetPasswordController from './controllers/reset_passswordController';
import CreateUserController from './controllers/create_userController';
import MailerController from './controllers/mailer_Controller';
import DeleteController from './controllers/deleteController';
import validator from './modules/validator';

const routes = express.Router();

const createUserControllers = new CreateUserController();
const forgotPasswordControllers = new ForgotPasswordController();
const resetPasswordControllers = new ResetPasswordController();
const mailerControllers = new MailerController();
const deleteControllers = new DeleteController();

routes.post('/user/forgot_password', forgotPasswordControllers.create);
routes.post('/user/reset_password', resetPasswordControllers.create);

routes.post('/user/login', createUserControllers.index);
routes.post('/user', validator, createUserControllers.create);

routes.delete('/user/:id', deleteControllers.index);

routes.post('/user/send', mailerControllers.create);


export default routes;