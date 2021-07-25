import RegiaoRepository from '../repository/RegiaoRepository'
import AppError from '../exception/AppError';

class RegiaoService {

    constructor() {
        this.repository = new RegiaoRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async insert(regiao) {

        this.validar(regiao);

        const result = await this.repository.insert(regiao);
        return result;
    }

    async update(regiao) {

        if (!regiao.id) throw new AppError("Campo ID obrigatório!");
        this.validar(regiao);

        const result = await this.repository.update(regiao);
        return result;
    }

    async delete(id) {
        await this.repository.delete(id);
    }

    validar(regiao) {
        if (!regiao.nome) throw new AppError("Campo Nome obrigatório!");
    }



}


export default RegiaoService;