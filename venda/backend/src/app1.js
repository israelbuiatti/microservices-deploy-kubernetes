import PedidoRepository from './app/repository/PedidoRepository';
import PedidoBaixaRepository from './app/repository/PedidoBaixaRepository';
import PedidoItemRepository from './app/repository/PedidoItemRepository';
import ProdutoRepository from './app/repository/ProdutoRepository';
import FornecedorRepository from './app/repository/FornecedorRepository';


const pedidoRepository = new PedidoRepository();
const pedidoBaixaRepository = new PedidoBaixaRepository();
const pedidoItemRepository = new PedidoItemRepository();
const produtoRepository = new ProdutoRepository();
const fornecedorRepository = new FornecedorRepository();


async function start() {

	const filtro = {
		id_tipo_pedido: 2,
		id_vendedor_logado: 'null'
	}

	const pedidos = await pedidoRepository.busca(filtro)

	console.log('total', pedidos.length);

	for (let x = 0; x < pedidos.length; x++) {
		
		const pedido = pedidos[x];
		console.log(x, pedido.id);

		const pedidoBaixa = await pedidoBaixaRepository.findByPedido(pedido.id);

		if (!pedidoBaixa) continue;

		pedidoBaixa.comissao_vend = pedidoBaixa.comissao_vend.toFixed(2);
		pedidoBaixa.comissao_sup_d = pedidoBaixa.comissao_sup_d.toFixed(2);
			

		const comissao = await calculaComissao(pedido);

		if (pedidoBaixa.comissao_vend != comissao.comissao_vend || pedidoBaixa.comissao_sup_d != comissao.comissao_sup_d) {

			comissao.id = pedidoBaixa.id;

			console.log('pedidoBaixa', pedidoBaixa);
			console.log('comissao', comissao);

			await pedidoBaixaRepository.update(comissao);
		}
		
	}

}

async function calculaComissao(pedido) {

	const pedidoItems = await pedidoItemRepository.findByPedido(pedido.id)

	const comissao = {};

	comissao.comissao_vend = 0;
	comissao.comissao_sup_d = 0;

	for (let x = 0; x < pedidoItems.length; x++) {
		const item = pedidoItems[x];
		const valor_total = (item.quantidade * item.valor_unitario).toFixed(2);

		const produto = await produtoRepository.findById(item.id_produto);
		const fornecedor = await fornecedorRepository.findById(produto.id_fornecedor);

		comissao.comissao_vend += fornecedor.comissao_vend_d * valor_total / 100;
		comissao.comissao_sup_d += fornecedor.comissao_sup_d * valor_total / 100;

	}

	comissao.comissao_vend = comissao.comissao_vend.toFixed(2);
	comissao.comissao_sup_d = comissao.comissao_sup_d.toFixed(2);

	return comissao;

}

start();