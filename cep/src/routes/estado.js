import { Router } from 'express';
import EstadoRepository from '../app/repository/EstadoRepository'

const routes = Router();

routes.get('/', async (req, res) => {

    const repository = new EstadoRepository();

    const result = await repository.db();

    return res.json(result);

});

export default routes;