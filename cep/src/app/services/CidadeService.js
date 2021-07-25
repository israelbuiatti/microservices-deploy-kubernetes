import CidadeRepository from '../repository/CidadeRepository'

class CidadeService {

    constructor() {
        this.repository = new CidadeRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async findByIdEstado(id) {
        const results = await this.repository.findByIdEstado(id);
        return results;
    }

}


export default CidadeService;