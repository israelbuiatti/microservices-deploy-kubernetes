import { Router } from 'express';
import ClienteController from '../app/controllers/ClienteController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const clienteController = new ClienteController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => clienteController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', clienteController.get.bind(clienteController));
routes.post('/', clienteController.create.bind(clienteController));
routes.post('/busca', clienteController.busca.bind(clienteController));
routes.put('/:id', clienteController.update.bind(clienteController));
routes.delete('/:id', clienteController.delete.bind(clienteController));
routes.get('/sintegra/:cnpj', clienteController.sintegra.bind(clienteController));

export default routes;