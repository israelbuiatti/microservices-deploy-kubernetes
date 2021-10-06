import { Router } from 'express';
import ComissaoController from '../app/controllers/ComissaoController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const comissaoController = new ComissaoController();

routes.use(ensureAuthenticated);

routes.post('/busca', comissaoController.busca.bind(comissaoController));
routes.post('/buscad', comissaoController.buscad.bind(comissaoController));

export default routes;