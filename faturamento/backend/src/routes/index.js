import { Router } from 'express';
import os from 'os';

const routes = Router();

const health = {
    app: "ms-faturamento-backend",
    version: "1.0",
    status: true,
    hostname: os.hostname()
}

routes.get('/health', (req, res) => res.send(health));

export default routes;