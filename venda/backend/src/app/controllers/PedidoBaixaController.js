import PedidoBaixa from '../models/PedidoBaixa';
import PedidoBaixaService from '../services/PedidoBaixaService';

export default class PedidoBaixaController {

	constructor() {
		this.pedidoBaixaService = new PedidoBaixaService();
	}


	async list(req, res) {
		const { id } = req.params;
		const results = await this.pedidoBaixaService.findByPedido(id);
		return res.json(results);
	}

	async create(req, res) {

		const pedidoBaixa = PedidoBaixa.create(req.body);

		const result = await this.pedidoBaixaService.insert(pedidoBaixa);

		return res.status(201).json(result);

	}

	async delete(req, res) {
		const { id } = req.params;
		await this.pedidoBaixaService.delete(id);
		return res.status(204).json();
	}


}