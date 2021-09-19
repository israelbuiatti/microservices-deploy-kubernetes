import PedidoItem from '../models/PedidoItem';
import PedidoItemService from '../services/PedidoItemService';
import AppError from '../exception/AppError';

export default class PedidoItemController {

	constructor() {
		this.pedidoItemService = new PedidoItemService();
	}


	async list(req, res) {
		const { id } = req.params;
		const results = await this.pedidoItemService.findByPedido(id);
		return res.json(results);
	}

	async create(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const pedidoItem = PedidoItem.create(req.body);

		const result = await this.pedidoItemService.insert(pedidoItem);

		return res.status(201).json(result);

	}

	async delete(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const { id } = req.params;
		await this.pedidoItemService.delete(id);
		return res.status(204).json();
	}


}