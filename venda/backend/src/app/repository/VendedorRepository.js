import BaseRepository from './BaseRepository'

class VendedorRepository extends BaseRepository {

    table = 'vendedor';

    async findAll() {
        const results = await this.db().orderBy('nome');
        return results;
    }

    async findAllVendedor() {
        const results = await this.db().where('flg_telemarketing', false).orderBy('nome');
        return results;
    }

    async findAllTelemarketing() {
        const results = await this.db().where('flg_telemarketing', true).orderBy('nome');
        return results;
    }

    async busca(vendedor) {

        let query = this.db().orderBy('nome');

        if (vendedor.nome) {
            query.whereRaw('LOWER(nome) LIKE ?', '%' + vendedor.nome.toLowerCase() + '%');
        }

        if (vendedor.flg_vend_d && vendedor.flg_sup_d) {
            query.whereRaw('(flg_vend_d or flg_sup_d)');
        }

        return await query;

    }

    async insert(vendedor) {
        const result = await this.db()
            .returning('*')
            .insert(vendedor);
        return result[0];
    }

    async update(vendedor) {

        const { id } = vendedor;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(vendedor);
        return result;
    }


}


export default VendedorRepository;