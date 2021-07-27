import PedidoBaixaRepository from '../repository/PedidoBaixaRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';

class PedidoBaixaService {

    constructor() {
        this.repository = new PedidoBaixaRepository();
    }

    async findByPedido(id) {
        const results = await this.repository.findByPedido(id);
        return results;
    }

    async insert(pedidoBaixa) {

        pedidoBaixa.valor = UTIL.moedaToUS(pedidoBaixa.valor);
        pedidoBaixa.data = UTIL.reformatDate(pedidoBaixa.data);

        this.validarPedidoBaixa(pedidoBaixa);
       
        const result = await this.repository.insert(pedidoBaixa);

        return result;
    }

    async delete(id) {
        await this.repository.findByPedido(id);
        await this.repository.delete(id);
    }

    validarPedidoBaixa(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");
    }


}


export default PedidoBaixaService;