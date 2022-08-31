import {Router} from 'express';
import AuthController from './controller/AuthController';

const routes = Router();

routes.post('/admin/signin', AuthController.signInAdmin);

//Deixando pública a rota para a aplicação
export default routes;