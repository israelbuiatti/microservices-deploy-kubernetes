import BaseRepository from './BaseRepository'

class CidadeRepository extends BaseRepository {

    table = 'cidade';

    async findAll() {
        const results = await this.db()
        // .select('id', 'nome_razao')
        return results;
    }

    async findByIdEstado(id) {
        console.log('id', id);
        const result = await this.db().where('id_estado', id);

        if (!result) throw new AppError("Registro não encontrado!");

        return result;
    }

}


export default CidadeRepository;