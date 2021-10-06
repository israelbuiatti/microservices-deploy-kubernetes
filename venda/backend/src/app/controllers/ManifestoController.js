import Manifesto from '../models/Manifesto';
import ManifestoService from '../services/ManifestoService';
import AppError from '../exception/AppError';

export default class ManifestoController {

	constructor() {
		this.manifestoService = new ManifestoService();
	}


	async list(req, res) {
		const results = await this.manifestoService.findAll();
		return res.json(results);
	}

	async busca(req, res) {
		const results = await this.manifestoService.findAll();
		return res.json(results);
	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.manifestoService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const manifesto = req.body;

		const result = await this.manifestoService.insert(manifesto);
		
		return res.status(201).json(result);

	}

	async update(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		const manifesto = req.body;

		await this.manifestoService.update({ id, ...manifesto });

		return res.status(200).json(manifesto);
	}

	async delete(req, res) {

		if (!req.user.admin) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const { id } = req.params;
		await this.manifestoService.delete(id);
		return res.status(204).json();
	}


}