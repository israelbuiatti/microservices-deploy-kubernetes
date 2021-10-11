import PedidoRepository from './app/repository/PedidoRepository';
import PedidoBaixaRepository from './app/repository/PedidoBaixaRepository';
import FornecedorRepository from './app/repository/FornecedorRepository';
import PedidoBaixaService from './app/services/PedidoBaixaService';


const pedidoRepository = new PedidoRepository();
const pedidoBaixaRepository = new PedidoBaixaRepository();
const fornecedorRepository = new FornecedorRepository();
const pedidoBaixaService = new PedidoBaixaService();


async function checkBaixaDistribuidora() {

	const filtro = {
		id_tipo_pedido: 2,
		id_vendedor_logado: 'null',
		data_inicio: '2021-09-01',
		data_fim: '2021-09-30',
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
			

		const comissao = await pedidoBaixaService.calculaComissaoDistribuidora(pedido);

		if (pedidoBaixa.comissao_vend != comissao.comissao_vend || pedidoBaixa.comissao_sup_d != comissao.comissao_sup_d) {

			comissao.id = pedidoBaixa.id;

			console.log('pedidoBaixa', pedidoBaixa);
			console.log('comissao', comissao);

			// await pedidoBaixaRepository.update(comissao);
			// return;
		}
		
	}

}


async function checkBaixaRepresentada() {

	const filtro = {
		id_tipo_pedido: 1,
		id_vendedor_logado: 'null',
		data_inicio: '2021-09-01',
		data_fim: '2021-09-30',
	}

	const pedidos = await pedidoRepository.busca(filtro)

	console.log('total', pedidos.length);

	for (let x = 0; x < pedidos.length; x++) {

		const pedido = pedidos[x];
		console.log(x, pedido.id);

		const pedidoBaixa = await pedidoBaixaRepository.findByPedido(pedido.id);
		if (!pedidoBaixa) continue;
		
		const fornecedor = await fornecedorRepository.findById(pedido.id_fornecedor);

		const comissao = {};
		let error = false;

		if (pedidoBaixa.comissao_vend) pedidoBaixa.comissao_vend = pedidoBaixa.comissao_vend.toFixed(2);
		comissao.comissao_vend = fornecedor.comissao_vend * pedidoBaixa.valor / 100;
		comissao.comissao_vend = comissao.comissao_vend.toFixed(2);

		if (pedidoBaixa.comissao_vend != comissao.comissao_vend) {
			console.log('pedidoBaixa-vend', pedidoBaixa);
			console.log('comissao_vend', comissao.comissao_vend);
			error = true;
		}

		if (pedido.id_vendedor_tel) {
			if (pedidoBaixa.comissao_tel) pedidoBaixa.comissao_tel = pedidoBaixa.comissao_tel.toFixed(2);
			comissao.comissao_tel = fornecedor.comissao_tel * pedidoBaixa.valor / 100;
			comissao.comissao_tel = comissao.comissao_tel.toFixed(2);
			if (pedidoBaixa.comissao_tel != comissao.comissao_tel) {
				console.log('pedidoBaixa-tel', pedidoBaixa);
				console.log('comissao', comissao);
				error = true;
			}
		}
		
		if (error) {
			comissao.id = pedidoBaixa.id;
			// await pedidoBaixaRepository.update(comissao);
		}

	}

}


checkBaixaDistribuidora();
// checkBaixaRepresentada();