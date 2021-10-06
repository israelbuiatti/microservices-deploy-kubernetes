import { Router } from 'express';
import PedidoController from '../app/controllers/PedidoController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const pedidoController = new PedidoController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => pedidoController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', pedidoController.get.bind(pedidoController));
routes.post('/', pedidoController.create.bind(pedidoController));
routes.post('/busca', pedidoController.busca.bind(pedidoController));
routes.post('/buscaPedidoManifesto', pedidoController.buscaPedidoManifesto.bind(pedidoController));
routes.post('/buscaPedidoManifesto/:id', pedidoController.buscaPedidoManifesto.bind(pedidoController));
routes.put('/:id', pedidoController.update.bind(pedidoController));
routes.delete('/:id', pedidoController.delete.bind(pedidoController));

export default routes;