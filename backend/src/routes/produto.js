import { Router } from 'express';
import ProdutoController from '../app/controllers/ProdutoController';

const routes = Router();
const produtoController = new ProdutoController();

routes.get('/', (req, res) => produtoController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', produtoController.get.bind(produtoController));
routes.post('/', produtoController.create.bind(produtoController));
routes.put('/:id', produtoController.update.bind(produtoController));
routes.delete('/:id', produtoController.delete.bind(produtoController));

export default routes;