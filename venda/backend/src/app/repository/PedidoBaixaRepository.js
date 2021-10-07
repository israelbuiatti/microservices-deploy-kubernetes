import BaseRepository from './BaseRepository'

class PedidoBaixaRepository extends BaseRepository {

    table = 'pedido_baixa';

    async findByPedido(id) {

        let query = this.db();

        query.where('id_pedido', id).first()

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

    async delete(id) {
        await this.db().where('id_pedido', id).delete();
    }

}


export default PedidoBaixaRepository;