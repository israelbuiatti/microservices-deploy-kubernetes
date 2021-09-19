import Cliente from '../models/Cliente';
import ClienteService from '../services/ClienteService';
import AppError from '../exception/AppError';
export default class ClienteController {

	constructor() {
		this.clienteService = new ClienteService();
	}


	async list(req, res) {
		const results = await this.clienteService.findAll();
		return res.json(results);
	}

	async busca(req, res) {

		const cliente = Cliente.create(req.body);
		
		const result = await this.clienteService.busca(cliente);

		return res.json(result);

	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.clienteService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		const cliente = Cliente.create(req.body);

		const result = await this.clienteService.insert(cliente);

		return res.status(201).json(result);

	}

	async update(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		const cliente = Cliente.create(req.body);

		await this.clienteService.update({ id, ...cliente });

		return res.status(200).json(cliente);
	}

	async delete(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		await this.clienteService.delete(id);
		return res.status(204).json();
	}


}
