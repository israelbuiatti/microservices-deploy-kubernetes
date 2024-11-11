import PedidoBaixaRepository from '../repository/PedidoBaixaRepository'
import PedidoRepository from '../repository/PedidoRepository'
import PedidoItemRepository from '../repository/PedidoItemRepository'
import FornecedorRepository from '../repository/FornecedorRepository'
import ProdutoRepository from '../repository/ProdutoRepository'
import AppError from '../exception/AppError';
import UTIL from '../utils/util';

class PedidoBaixaService {

    constructor() {
        this.repository = new PedidoBaixaRepository();
        this.repositoryPedido = new PedidoRepository();
        this.repositoryItemPedido = new PedidoItemRepository();
        this.repositoryProduto = new ProdutoRepository();
        this.repositoryFornecedor = new FornecedorRepository();
    }

    async findByPedido(id) {
        const results = await this.repository.findByPedido(id);
        return results;
    }

    async insert(pedidoBaixa) {

        this.validarPedidoBaixa(pedidoBaixa);

        const pedido = await this.repositoryPedido.findById(pedidoBaixa.id_pedido);
        const fornecedor = await this.repositoryFornecedor.findById(pedido.id_fornecedor);

        pedidoBaixa.valor = pedidoBaixa.valor.toFixed(2);
        pedido.valor = pedido.valor.toFixed(2);

        if (parseFloat(pedidoBaixa.valor) > parseFloat(pedido.valor)) {
            throw new AppError("Valor da baixa não pode ser maior que o valor do pedido!");
        }

        pedidoBaixa.comissao_vend = fornecedor.comissao_vend * pedidoBaixa.valor / 100;

        if (pedido.id_vendedor_tel) {
            pedidoBaixa.comissao_tel = fornecedor.comissao_tel * pedidoBaixa.valor / 100;
        }
       
        const result = await this.repository.insert(pedidoBaixa);

        return result;
    }

    async pedidoBaixaDistribuidora(pedidoBaixa) {

        this.validarPedidoBaixa(pedidoBaixa);

        const pedido = await this.repositoryPedido.findById(pedidoBaixa.id_pedido);

        pedido.valor = pedido.valor.toFixed(2);

        if (pedidoBaixa.valor != pedido.valor) {
            throw new AppError("Valor da baixa precisa ser igual ao valor do pedido!");
        }

        const comissao = await this.calculaComissaoDistribuidora(pedido);

        pedidoBaixa.comissao_vend = comissao.comissao_vend;
        pedidoBaixa.comissao_sup_d = comissao.comissao_sup_d;

        const result = await this.repository.insert(pedidoBaixa);

        return result;
    }

    async calculaComissaoDistribuidora(pedido) {

        const pedidoItems = await this.repositoryItemPedido.findByPedido(pedido.id)

        const comissao = {};

        comissao.comissao_vend = 0;
        comissao.comissao_sup_d = 0;

        for (let x = 0; x < pedidoItems.length; x++) {
            const item = pedidoItems[x];
            const valor_total = (item.quantidade * item.valor_unitario).toFixed(2);

            const produto = await this.repositoryProduto.findById(item.id_produto);
            const fornecedor = await this.repositoryFornecedor.findById(produto.id_fornecedor);

            comissao.comissao_vend += fornecedor.comissao_vend_d * valor_total / 100;
            comissao.comissao_sup_d += fornecedor.comissao_sup_d * valor_total / 100;

        }

        comissao.comissao_vend = comissao.comissao_vend.toFixed(2);
        comissao.comissao_sup_d = comissao.comissao_sup_d.toFixed(2);

        return comissao;

    }


    async delete(id) {

        await this.repository.findByPedido(id);
        await this.repository.delete(id);
    }

    validarPedidoBaixa(pedido) {
        //if (!pedido.id_cliente) throw new AppError("Campo Cliente obrigatório!");

        pedido.valor = UTIL.moedaToUS(pedido.valor);
        pedido.data = UTIL.reformatDate(pedido.data);

    }


}


export default PedidoBaixaService;