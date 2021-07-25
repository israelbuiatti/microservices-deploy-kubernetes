import EstadoService from '../services/EstadoService';

export default class EstadoController {

	constructor() {
		this.estadoService = new EstadoService();
	}


	async list(req, res) {
		const results = await this.estadoService.findAll();
		return res.json(results);
	}

}