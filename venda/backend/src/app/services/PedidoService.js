import PedidoRepository from '../repository/PedidoRepository'
import PedidoItemRepository from '../repository/PedidoItemRepository'
import ClienteRepository from '../repository/ClienteRepository'
import CidadeRepository from '../repository/CidadeRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';
import { returning } from '../../database';

class PedidoService {

    constructor() {
        this.repository = new PedidoRepository();
        this.repositoryPedidoItem = new PedidoItemRepository();
        this.clienteRepository = new ClienteRepository();
        this.cidadeRepository = new CidadeRepository();
    }

    async findById(id) {
        const pedido = await this.repository.findById(id);
        pedido.itens = await this.repositoryPedidoItem.findByPedido(id);
        pedido.cliente = await this.clienteRepository.findById(pedido.id_cliente);
        pedido.cliente.cidade = await this.cidadeRepository.findById(pedido.cliente.cidade);

        return pedido;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async busca(pedido) {
        return await this.repository.busca(pedido);
    }

    async buscaPedidoManifesto(pedido) {

        const pedidos = await this.repository.buscaPedidoManifesto(pedido);

        for(let x=0; x<pedidos.length; x++) {
            pedidos[x].itens = await this.repositoryPedidoItem.findByPedido(pedidos[x].id);
        }

        return pedidos;
    }

    async insert(pedido) {

        this.validar(pedido);

        const result = await this.repository.insert(pedido);
        return result;
    }

    async update(pedido) {

        if (!pedido.id) throw new AppError("Campo ID obrigatório!");
        this.validar(pedido);

        delete pedido.valor;

        const result = await this.repository.update(pedido);
        return result;
    }

    async delete(id) {

        await this.repository.delete(id);
    }

    validar(pedido) {

        delete pedido.nome_razao;
        pedido.data = UTIL.reformatDate(pedido.data);

        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");
    }

    validarPedidoItem(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");
    }


}


export default PedidoService;