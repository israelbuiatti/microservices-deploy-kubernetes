import { Router } from 'express';
import PedidoBaixaController from '../app/controllers/PedidoBaixaController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const pedidoBaixaController = new PedidoBaixaController();

routes.use(ensureAuthenticated);

routes.get('/:id', pedidoBaixaController.list.bind(pedidoBaixaController));
routes.post('/', pedidoBaixaController.create.bind(pedidoBaixaController));
routes.post('/pedidoBaixaDistribuidora', pedidoBaixaController.pedidoBaixaDistribuidora.bind(pedidoBaixaController));
routes.delete('/:id', pedidoBaixaController.delete.bind(pedidoBaixaController));

export default routes;