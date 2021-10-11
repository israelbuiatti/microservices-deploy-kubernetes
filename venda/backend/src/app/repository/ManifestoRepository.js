import knex from '../../database';
import BaseRepository from './BaseRepository'


class ManifestoRepository extends BaseRepository {

    table = 'manifesto';

    async findAll() {
        //const results = await this.db()
        // .select('id', 'descricao')

        const results = await knex.raw(`
            select * from (
                select
                    id_manifesto, sum(p.valor) total_valor, count(p.id) total_pedidos
                from
                    ms.pedido p
                where
                    p.flg_ativo
                    and p.id_manifesto is not null
                group by
                    id_manifesto
            ) c1
            join ms.manifesto m on m.id=c1.id_manifesto
        `);
        return results.rows;
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