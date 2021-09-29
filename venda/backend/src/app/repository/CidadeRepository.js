import BaseRepository from './BaseRepository'

class CidadeRepository extends BaseRepository {

    table = 'cidade';

    async findAll() {
        const results = await this.db().orderBy('descricao')
        // .select('id', 'descricao')
        return results;
    }

    async findDist() {
        const results = await this.db().where('flg_distribuidora', true).orderBy('descricao')
        // .select('id', 'descricao')
        return results;
    }

}


export default CidadeRepository;