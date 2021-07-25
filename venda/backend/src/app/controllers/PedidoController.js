import Pedido from '../models/Pedido';
import PedidoItem from '../models/PedidoItem';
import PedidoService from '../services/PedidoService';

export default class PedidoController {

	constructor() {
		this.pedidoService = new PedidoService();
	}


	async list(req, res) {
		const results = await this.pedidoService.findAll();
		return res.json(results);
	}

	async busca(req, res) {

		const pedido = Pedido.create(req.body);

		const result = await this.pedidoService.busca(pedido);

		return res.json(result);

	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.pedidoService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		const pedido = Pedido.create(req.body);

		const result = await this.pedidoService.insert(pedido);

		return res.status(201).json(result);

	}

	async update(req, res) {
		const { id } = req.params;
		const pedido = Pedido.create(req.body);

		await this.pedidoService.update({ id, ...pedido });

		return res.status(200).json(pedido);
	}

	async delete(req, res) {
		const { id } = req.params;
		await this.pedidoService.delete(id);
		return res.status(204).json();
	}


}