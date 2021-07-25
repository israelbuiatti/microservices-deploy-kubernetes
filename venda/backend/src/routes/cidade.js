import { Router } from 'express';
import CidadeController from '../app/controllers/CidadeController';


const routes = Router();
const cidadeController = new CidadeController();

routes.get('/', (req, res) => cidadeController.list(req, res));

export default routes;