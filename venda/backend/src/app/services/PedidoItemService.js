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

        let pedido = await this.repositoryPedido.findById(pedidoItem.id_pedido);
        pedido.valor = pedidoItem.quantidade * pedidoItem.valor_unitario;
        await this.repositoryPedido.update(pedido);
        
        const result = await this.repository.insert(pedidoItem);

        return result;
    }

    async delete(id) {
        await this.repository.findById(id);
        await this.repository.delete(id);
    }

    validarPedidoItem(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");
    }


}


export default PedidoItemService;