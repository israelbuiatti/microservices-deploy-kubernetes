import PedidoBaixaRepository from '../repository/PedidoBaixaRepository'
import PedidoRepository from '../repository/PedidoRepository'
import FornecedorRepository from '../repository/FornecedorRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';

class PedidoBaixaService {

    constructor() {
        this.repository = new PedidoBaixaRepository();
        this.repositoryPedido = new PedidoRepository();
        this.repositoryFornecedor = new FornecedorRepository();
    }

    async findByPedido(id) {
        const results = await this.repository.findByPedido(id);
        return results;
    }

    async insert(pedidoBaixa) {

        const pedido = await this.repositoryPedido.findById(pedidoBaixa.id_pedido);
        const fornecedor = await this.repositoryFornecedor.findById(pedido.id_fornecedor);
        

        pedidoBaixa.valor = UTIL.moedaToUS(pedidoBaixa.valor);
        pedidoBaixa.data = UTIL.reformatDate(pedidoBaixa.data);


        if (pedidoBaixa.valor > pedido.valor) {
            throw new AppError("Valor da baixa não pode ser maior que o valor do pedido!");
        }

        pedidoBaixa.comissao_vend = fornecedor.comissao_vend * pedidoBaixa.valor / 100;

        if (pedido.id_vendedor_tel) {
            pedidoBaixa.comissao_tel = fornecedor.comissao_tel * pedidoBaixa.valor / 100;
        }
        

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