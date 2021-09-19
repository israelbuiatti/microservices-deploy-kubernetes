import Vendedor from '../models/Vendedor';
import VendedorService from '../services/VendedorService';

export default class VendedorController {

	constructor() {
		this.vendedorService = new VendedorService();
	}


	async list(req, res) {

		const telemarketing = req.query.telemarketing;
		const vendedor = req.query.vendedor;

		let results;

		if (telemarketing) results = await this.vendedorService.findAllTelemarketing();
		else if (vendedor) results = await this.vendedorService.findAllVendedor();
		else results = await this.vendedorService.findAll();
		
		return res.json(results);
	}

	async telemarketing(req, res) {
		const results = await this.vendedorService.findAllTelemarketing();
		return res.json(results);
	}

	async busca(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}
		
		const vendedor = Vendedor.create(req.body);

		const result = await this.vendedorService.busca(vendedor);

		return res.json(result);

	}

	async get(req, res) {
		const { id } = req.params;
		const result = await this.vendedorService.findById(id);
		return res.json(result);
	}

	async create(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const vendedor = Vendedor.create(req.body);

		const result = await this.vendedorService.insert(vendedor);

		return res.status(201).json(result);

	}

	async update(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		const vendedor = Vendedor.create(req.body);

		await this.vendedorService.update({ id, ...vendedor });

		return res.status(200).json(vendedor);
	}

	async delete(req, res) {

		if (!['ROLE_MASTER', 'ROLE_ADMIN'].includes(req.user.role)) {
			throw new AppError("Usuário não autorizado!", 401);
		}

		const { id } = req.params;
		await this.vendedorService.delete(id);
		return res.status(204).json();
	}


}