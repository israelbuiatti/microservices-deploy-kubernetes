import PedidoBaixa from '../models/PedidoBaixa';
import PedidoBaixaService from '../services/PedidoBaixaService';
import AppError from '../exception/AppError';
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

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const pedidoBaixa = PedidoBaixa.create(req.body);

		const result = await this.pedidoBaixaService.insert(pedidoBaixa);

		return res.status(201).json(result);

	}

	async pedidoBaixaDistribuidora(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const pedidoBaixa = PedidoBaixa.create(req.body);

		const result = await this.pedidoBaixaService.pedidoBaixaDistribuidora(pedidoBaixa);

		return res.status(201).json(result);

	}

	async delete(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const { id } = req.params;
		await this.pedidoBaixaService.delete(id);
		return res.status(204).json();
	}


}