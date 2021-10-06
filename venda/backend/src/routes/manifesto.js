import { Router } from 'express';
import ManifestoController from '../app/controllers/ManifestoController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = Router();
const manifestoController = new ManifestoController();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => manifestoController.list(req, res));
routes.get('/:id', manifestoController.get.bind(manifestoController));
routes.post('/', manifestoController.create.bind(manifestoController));
routes.post('/busca', manifestoController.busca.bind(manifestoController));
routes.put('/:id', manifestoController.update.bind(manifestoController));
routes.delete('/:id', manifestoController.delete.bind(manifestoController));

export default routes;