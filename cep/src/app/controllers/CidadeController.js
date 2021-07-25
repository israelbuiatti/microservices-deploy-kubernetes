import CidadeService from '../services/CidadeService';

export default class CidadeController {

	constructor() {
		this.cidadeService = new CidadeService();
	}


	async list(req, res) {
		const results = await this.cidadeService.findAll();
		return res.json(results);
	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.cidadeService.findByIdEstado(id);
		return res.json(result);
	}

}