import PedidoCobrancaRepository from '../repository/PedidoCobrancaRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';

class PedidoCobrancaService {

    constructor() {
        this.repository = new PedidoCobrancaRepository();
    }

    async findByPedido(id) {
        const results = await this.repository.findByPedido(id);
        return results;
    }

    async insert(fornecedor) {

        this.validar(fornecedor);

        const result = await this.repository.insert(fornecedor);
        return result;
    }

    async delete(id) {

        const result = await this.repository.findById(id);
        if (!result) throw new AppError("Registro não encontrado.");

        await this.repository.delete(id);
    }

    validar(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");

        pedido.valor = UTIL.moedaToUS(pedido.valor);
        pedido.data = UTIL.reformatDate(pedido.data);

    }


}


export default PedidoCobrancaService;