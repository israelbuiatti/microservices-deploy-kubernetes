import BaseRepository from './BaseRepository'

class PedidoItemRepository extends BaseRepository {

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

    async delete(id) {
        console.log('delete baixa')
        await this.db().where('id_pedido', id).delete();
    }

}


export default PedidoItemRepository;