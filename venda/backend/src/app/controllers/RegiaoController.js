import Regiao from '../models/Regiao';
import RegiaoService from '../services/RegiaoService';
import AppError from '../exception/AppError';

export default class RegiaoController {

	constructor() {
		this.regiaoService = new RegiaoService();
	}


	async list(req, res) {
		const results = await this.regiaoService.findAll();
		return res.json(results);
	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.regiaoService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const regiao = Regiao.create(req.body);

		const result = await this.regiaoService.insert(regiao);

		return res.status(201).json(result);

	}

	async update(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		const regiao = Regiao.create(req.body);

		await this.regiaoService.update({ id, ...regiao });

		return res.status(200).json(regiao);
	}

	async delete(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const { id } = req.params;
		await this.regiaoService.delete(id);
		return res.status(204).json();
	}


}