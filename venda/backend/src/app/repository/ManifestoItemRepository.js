import BaseRepository from './BaseRepository'
import knex from '../../database';

class ManifestoRepository extends BaseRepository {

    table = 'manifesto_item';

    async findAll() {
        const results = await this.db()
        // .select('id', 'descricao')
        return results;
    }

    async findById(id_manifesto) {
        const results = await this.db().where('id_manifesto', id_manifesto)
        // .select('id', 'descricao')
        return results;
    }

    async insert(manifesto) {

        const result = await this.db()
            .returning('*')
            .insert(manifesto);
        return result;
    }

    async update(manifesto) {

        const { id } = manifesto;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(manifesto);
        return result;
    }

    async update(manifesto) {

        const { id } = manifesto;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(manifesto);
        return result;
    }

    async inativaManifestoItem(id_manifesto) {
        await knex.raw("update ms.manifesto_item set flg_ativo=false where id_manifesto=" + id_manifesto);
        await knex.raw("update ms.pedido set id_manifesto=null where id_manifesto=" + id_manifesto);
    }

}


export default ManifestoRepository;