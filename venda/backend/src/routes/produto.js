import { Router } from 'express';
import ProdutoController from '../app/controllers/ProdutoController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const produtoController = new ProdutoController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => produtoController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', produtoController.get.bind(produtoController));
routes.post('/', produtoController.create.bind(produtoController));
routes.post('/busca', produtoController.busca.bind(produtoController));
routes.put('/:id', produtoController.update.bind(produtoController));
routes.delete('/:id', produtoController.delete.bind(produtoController));

export default routes;