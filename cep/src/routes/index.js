import { Router } from 'express';
import estadoRouter from './estado'
import cidadeRouter from './cidade'
import os from 'os';

const routes = Router();

const health = {
    app: "cep",
    version: "1.0",
    status: true,
    hostname: os.hostname()
}

routes.get('/health', (req, res) => res.send(health));

routes.use('/estado', estadoRouter);
routes.use('/cidade', cidadeRouter);

export default routes;