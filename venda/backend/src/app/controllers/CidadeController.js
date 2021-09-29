import CidadeService from '../services/CidadeService';

export default class CidadeController {

	constructor() {
		this.cidadeService = new CidadeService();
	}


	async list(req, res) {
		const results = await this.cidadeService.findAll();
		return res.json(results);
	}

	async listDist(req, res) {
		const results = await this.cidadeService.findDist();
		return res.json(results);
	}

}