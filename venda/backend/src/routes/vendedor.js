import { Router } from 'express';
import VendedorController from '../app/controllers/VendedorController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const vendedorController = new VendedorController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => vendedorController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', vendedorController.get.bind(vendedorController));
routes.post('/', vendedorController.create.bind(vendedorController));
routes.post('/busca', vendedorController.busca.bind(vendedorController));
routes.post('/getAccess', vendedorController.getAccess.bind(vendedorController));
routes.put('/:id', vendedorController.update.bind(vendedorController));
routes.delete('/:id', vendedorController.delete.bind(vendedorController));

export default routes;