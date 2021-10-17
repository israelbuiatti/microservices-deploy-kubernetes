import BaseRepository from './BaseRepository'

class PedidoCobrancaRepository extends BaseRepository {

    table = 'pedido_cobranca';

    async findByPedido(id) {

        let query = this.db();

        query.where('id_pedido', id)

        return await query;
    }

    async insert(pedidoItem) {

        const result = await this.db()
            .returning('*')
            .insert(pedidoItem);
        return result[0];
    }

    async update(pedido) {

        const { id } = pedido;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(pedido);
        return result;
    }


}


export default PedidoCobrancaRepository;