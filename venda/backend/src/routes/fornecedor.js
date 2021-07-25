import { Router } from 'express';
import FornecedorController from '../app/controllers/FornecedorController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const fornecedorController = new FornecedorController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => fornecedorController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', fornecedorController.get.bind(fornecedorController));
routes.post('/', fornecedorController.create.bind(fornecedorController));
routes.post('/busca', fornecedorController.busca.bind(fornecedorController));
routes.put('/:id', fornecedorController.update.bind(fornecedorController));
routes.delete('/:id', fornecedorController.delete.bind(fornecedorController));

export default routes;