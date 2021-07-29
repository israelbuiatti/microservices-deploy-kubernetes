import Pedido from '../models/Pedido';
import ComissaoService from '../services/ComissaoService';

export default class ComissaoController {

	constructor() {
		this.comissaoService = new ComissaoService();
	}

	async busca(req, res) {

		const result = await this.comissaoService.busca(req.body);

		return res.json(result);

	}


}