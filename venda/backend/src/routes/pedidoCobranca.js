import { Router } from 'express';
import PedidoCobrancaController from '../app/controllers/PedidoCobrancaController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const pedidoCobrancaController = new PedidoCobrancaController();

routes.use(ensureAuthenticated);

routes.get('/:id', pedidoCobrancaController.list.bind(pedidoCobrancaController));
routes.post('/', pedidoCobrancaController.create.bind(pedidoCobrancaController));
routes.delete('/:id', pedidoCobrancaController.delete.bind(pedidoCobrancaController));

export default routes;