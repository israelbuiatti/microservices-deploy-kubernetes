import { Router } from 'express';
import RegiaoController from '../app/controllers/RegiaoController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const regiaoController = new RegiaoController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => regiaoController.list(req, res)); // POSSUI ESSAS DUAS OPÇÕES PRA USAR O CONTEXTO THIS
routes.get('/:id', regiaoController.get.bind(regiaoController));
routes.post('/', regiaoController.create.bind(regiaoController));
routes.put('/:id', regiaoController.update.bind(regiaoController));
routes.delete('/:id', regiaoController.delete.bind(regiaoController));

export default routes;