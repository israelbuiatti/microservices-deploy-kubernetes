import VendedorRepository from '../repository/VendedorRepository'
import AppError from '../exception/AppError';

class VendedorService {

    constructor() {
        this.repository = new VendedorRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async findAllTelemarketing() {
        const results = await this.repository.findAllTelemarketing();
        return results;
    }

    async busca(vendedor) {
        return await this.repository.busca(vendedor);
    }

    async insert(vendedor) {

        this.validar(vendedor);

        const result = await this.repository.insert(vendedor);
        return result;
    }

    async update(vendedor) {

        if (!vendedor.id) throw new AppError("Campo ID obrigatório!");
        this.validar(vendedor);

        const result = await this.repository.update(vendedor);
        return result;
    }

    async delete(id) {
        await this.repository.delete(id);
    }

    validar(vendedor) {
        if (!vendedor.nome) throw new AppError("Campo Nome obrigatório!");
    }



}


export default VendedorService;