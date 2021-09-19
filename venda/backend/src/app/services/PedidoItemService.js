import PedidoRepository from '../repository/PedidoRepository'
import PedidoItemRepository from '../repository/PedidoItemRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';
import { returning } from '../../database';

class PedidoItemService {

    constructor() {
        this.repository = new PedidoItemRepository();
        this.repositoryPedido = new PedidoRepository();
    }

    async findByPedido(id) {
        const results = await this.repository.findByPedido(id);
        return results;
    }

    async insert(pedidoItem) {

        pedidoItem.valor_unitario = UTIL.moedaToUS(pedidoItem.valor_unitario);

        this.validarPedidoItem(pedidoItem);
        
        const result = await this.repository.insert(pedidoItem);

        await this.calcularValorPedido(pedidoItem.id_pedido);

        return result;
    }

    async delete(id) {

        const pedidoItem = await this.repository.findById(id);
        await this.repository.delete(id);
        await this.calcularValorPedido(pedidoItem.id_pedido);
    }

    validarPedidoItem(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");
    }

    async calcularValorPedido(id) {

        const lista = await this.repository.findByPedido(id);

        let total = 0;
        lista.forEach(item => {
            total += item.quantidade*item.valor_unitario;
        });

        let pedido = await this.repositoryPedido.findById(id);
        pedido.valor = total;
        await this.repositoryPedido.update(pedido);

    }


}


export default PedidoItemService;