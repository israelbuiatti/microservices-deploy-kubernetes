import CidadeRepository from '../repository/CidadeRepository'


class CidadeService {

    constructor() {
        this.repository = new CidadeRepository();
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async findDist() {
        const results = await this.repository.findDist();
        return results;
    }

}


export default CidadeService;