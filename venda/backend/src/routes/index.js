import { Router } from 'express';
import os from 'os';

import clienteRouter from './cliente'
import pedidoRouter from './pedido'
import pedidoItemRouter from './pedidoItem'
import pedidoBaixaRouter from './pedidoBaixa'
import produtoRouter from './produto'
import fornecedorRouter from './fornecedor'
import vendedorRouter from './vendedor'
import regiaoRouter from './regiao'
import cidadeRouter from './cidade'
import comissaoRouter from './comissao'
import ClienteRepository from '../app/repository/ClienteRepository';

const routes = Router();

const health = {
    app: "ms-venda-backend",
    version: "1.0",    
    status: true,
    hostname: os.hostname()
}

routes.get('/health', (req, res) => res.send(health));

routes.use('/cliente', clienteRouter);
routes.use('/produto', produtoRouter);
routes.use('/fornecedor', fornecedorRouter);
routes.use('/vendedor', vendedorRouter);
routes.use('/pedido', pedidoRouter);
routes.use('/pedidoItem', pedidoItemRouter);
routes.use('/pedidoBaixa', pedidoBaixaRouter);
routes.use('/regiao', regiaoRouter);
routes.use('/cidade', cidadeRouter);
routes.use('/comissao', comissaoRouter);
routes.use('/comissao', comissaoRouter);




export default routes;