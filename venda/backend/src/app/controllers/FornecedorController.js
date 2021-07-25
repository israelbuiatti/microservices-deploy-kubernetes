import Fornecedor from '../models/Fornecedor';
import FornecedorService from '../services/FornecedorService';

export default class FornecedorController {

	constructor() {
		this.fornecedorService = new FornecedorService();
	}


	async list(req, res) {
		const results = await this.fornecedorService.findAll();
		return res.json(results);
	}

	async busca(req, res) {

		console.log('req', req.body);

		const fornecedor = Fornecedor.create(req.body);

		const result = await this.fornecedorService.busca(fornecedor);

		return res.json(result);

	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.fornecedorService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		const fornecedor = Fornecedor.create(req.body);

		const result = await this.fornecedorService.insert(fornecedor);

		return res.status(201).json(result);

	}

	async update(req, res) {
		const { id } = req.params;
		const fornecedor = Fornecedor.create(req.body);

		await this.fornecedorService.update({ id, ...fornecedor });

		return res.status(200).json(fornecedor);
	}

	async delete(req, res) {
		const { id } = req.params;
		await this.fornecedorService.delete(id);
		return res.status(204).json();
	}


}