import express from 'express';
import ForgotPasswordController from './controllers/forgot_passowordController';
import CreateUserController from './controllers/userController';
import MailerController from './controllers/mailer_Controller';

const routes = express.Router();

const createUserControllers = new CreateUserController();
const forgotPasswordControllers = new ForgotPasswordController();
const mailerControllers = new MailerController();

routes.post('/user/forgot_password', forgotPasswordControllers.create);

routes.post('/user/get', createUserControllers.index);
routes.post('/user/create', createUserControllers.create);
routes.put('/user/reset_password', createUserControllers.update);
routes.delete('/user/delete/:id', createUserControllers.delete);

routes.post('/user/send', mailerControllers.create);

export default routes;