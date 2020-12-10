import { Router } from 'express';
import PedidoController from '../app/controllers/PedidoController';

const routes = Router();
const pedidoController = new PedidoController();

routes.get('/', (req, res) => pedidoController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', pedidoController.get.bind(pedidoController));
routes.post('/', pedidoController.create.bind(pedidoController));
routes.put('/:id', pedidoController.update.bind(pedidoController));
routes.delete('/:id', pedidoController.delete.bind(pedidoController));

export default routes;