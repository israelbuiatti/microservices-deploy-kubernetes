import BaseRepository from './BaseRepository'

class ManifestoRepository extends BaseRepository {

    table = 'manifesto';

    async findAll() {
        const results = await this.db()
        // .select('id', 'descricao')
        return results;
    }

    async insert(manifesto) {
        const result = await this.db()
            .returning('*')
            .insert(manifesto);
        return result[0];
    }

    async update(manifesto) {

        const { id } = manifesto;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(manifesto);
        return result;
    }


}


export default ManifestoRepository;