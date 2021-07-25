import Produto from '../models/Produto';
import ProdutoService from '../services/ProdutoService';

export default class ProdutoController {

	constructor() {
		this.produtoService = new ProdutoService();
	}


	async list(req, res) {
		const results = await this.produtoService.findAll();
		return res.json(results);
	}

	async busca(req, res) {

		const produto = Produto.create(req.body);

		const result = await this.produtoService.busca(produto);

		return res.json(result);

	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.produtoService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		const produto = Produto.create(req.body);

		const result = await this.produtoService.insert(produto);

		return res.status(201).json(result);

	}

	async update(req, res) {
		const { id } = req.params;
		const produto = Produto.create(req.body);

		await this.produtoService.update({ id, ...produto });

		return res.status(200).json(produto);
	}

	async delete(req, res) {
		const { id } = req.params;
		await this.produtoService.delete(id);
		return res.status(204).json();
	}


}