import { Router } from 'express';
import PedidoItemController from '../app/controllers/PedidoItemController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const pedidoItemController = new PedidoItemController();

routes.use(ensureAuthenticated);

routes.get('/:id', pedidoItemController.list.bind(pedidoItemController));
routes.post('/', pedidoItemController.create.bind(pedidoItemController));
routes.delete('/:id', pedidoItemController.delete.bind(pedidoItemController));

export default routes;