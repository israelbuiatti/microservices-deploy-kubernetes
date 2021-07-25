import PedidoRepository from '../repository/PedidoRepository'
import PedidoItemRepository from '../repository/PedidoItemRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';
import { returning } from '../../database';

class PedidoService {

    constructor() {
        this.repository = new PedidoRepository();
        this.repositoryPedidoItem = new PedidoItemRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async busca(pedido) {
        return await this.repository.busca(pedido);
    }

    async insert(pedido) {

        this.validar(pedido);

        const result = await this.repository.insert(pedido);
        return result;
    }

    async update(pedido) {

        if (!pedido.id) throw new AppError("Campo ID obrigatório!");
        this.validar(pedido);

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