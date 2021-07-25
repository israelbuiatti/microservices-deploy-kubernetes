import ClienteRepository from '../repository/ClienteRepository'
import AppError from '../exception/AppError';

class ClienteService {

    constructor() {
        this.repository = new ClienteRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async busca(cliente) {
        return await this.repository.busca(cliente);
    }

    async insert(cliente) {

        this.validar(cliente);

        const result = await this.repository.insert(cliente);
        return result;
    }

    async update(cliente) {

        if (!cliente.id) throw new AppError("Campo ID obrigatório!");
        this.validar(cliente);

        const result = await this.repository.update(cliente);
        return result;
    }

    async delete(id) {
        const result = await this.repository.findById(id);
        if (!result) throw new AppError("Registro não encontrado.");

        await this.repository.delete(id);
    }

    validar(cliente) {
        if (!cliente.nome_razao) throw new AppError("Campo Nome Razão obrigatório!");
        if (!cliente.cnpj) throw new AppError("Campo CNPJ obrigatório!");
    }


}


export default ClienteService;