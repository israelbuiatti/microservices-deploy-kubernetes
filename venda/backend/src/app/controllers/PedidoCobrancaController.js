import PedidoCobranca from '../models/PedidoCobranca';
import PedidoCobrancaService from '../services/PedidoCobrancaService';
import AppError from '../exception/AppError';
export default class PedidoCobrancaController {

	constructor() {
		this.pedidoCobrancaService = new PedidoCobrancaService();
	}


	async list(req, res) {
		const { id } = req.params;
		const results = await this.pedidoCobrancaService.findByPedido(id);
		return res.json(results);
	}

	async create(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const pedidoCobranca = PedidoCobranca.create(req.body);

		const result = await this.pedidoCobrancaService.insert(pedidoCobranca);

		return res.status(201).json(result);

	}

	async delete(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const { id } = req.params;
		await this.pedidoCobrancaService.delete(id);
		return res.status(204).json();
	}


}