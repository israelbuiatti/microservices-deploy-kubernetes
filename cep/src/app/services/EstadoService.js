import EstadoRepository from '../repository/EstadoRepository'

class EstadoService {

    constructor() {
        this.repository = new EstadoRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

}


export default EstadoService;