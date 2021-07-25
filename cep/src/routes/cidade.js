import { Router } from 'express';
import CidadeController from '../app/controllers/CidadeController'

const routes = Router();
const cidadeController = new CidadeController();


routes.get('/', cidadeController.list.bind(cidadeController));
routes.get('/:id', cidadeController.get.bind(cidadeController));



export default routes;