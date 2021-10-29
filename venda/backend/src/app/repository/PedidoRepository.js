import BaseRepository from './BaseRepository'

class PedidoRepository extends BaseRepository {

    table = 'pedido';

    async findAll() {
        const results = await this.db()
        // .select('id', 'descricao')
        return results;
    }
    
    async busca(pedido) {

        let query = this.db().orderBy('id', 'desc').limit(50);

        query.join('cliente', 'pedido.id_cliente', '=', 'cliente.id')
        query.join('cidade', 'cliente.cidade', '=', 'cidade.id')
        query.join('vendedor', 'pedido.id_vendedor', '=', 'vendedor.id')

        query.select('pedido.*', 'cliente.nome_razao', 'cidade.descricao as descricao_cidade', 'vendedor.nome as vendedor_nome')

        if (pedido.id) {
            query.whereRaw('( pedido.id=' + pedido.id+ ' or LOWER(pedido.pedido) LIKE ? )', '%' + pedido.id.toLowerCase() + '%');
        }
        
        if (pedido.nome_razao) {
            query.whereRaw('LOWER(cliente.nome_razao) LIKE ?', '%' + pedido.nome_razao.toLowerCase() + '%');
        }

        if (pedido.id_tipo_pedido) {
            query.where('id_tipo_pedido', pedido.id_tipo_pedido);
        }
        
        if (pedido.id_vendedor_logado != 'null') {
            query.where('id_vendedor', pedido.id_vendedor_logado);
        }

        if (pedido.id_vendedor) {
            query.where('id_vendedor', pedido.id_vendedor);
        }

        if (pedido.cidade) {
            query.where('cliente.cidade', pedido.cidade);
        }

        if (pedido.data_inicio) {
            query.where('data', '>=', pedido.data_inicio);
        }

        if (pedido.data_fim) {
            query.where('data', '<=', pedido.data_fim);
        }

        return await query;

    }

    async buscaPedidoManifesto(pedido) {

        let query = this.db();

        query.join('cliente', 'pedido.id_cliente', '=', 'cliente.id')
        query.join('cidade', 'cliente.cidade', '=', 'cidade.id')
        query.join('vendedor', 'pedido.id_vendedor', '=', 'vendedor.id')

        query.select(
                'pedido.*', 
                'cliente.nome_razao', 'cliente.endereco', 'cliente.bairro', 'cliente.tel1', 'cliente.tel2', 'cliente.fax',
                'cidade.descricao as descricao_cidade', 
                'vendedor.nome as vendedor_nome')

        
        query.whereRaw(` 
            ( 
                id_tipo_pedido=2 
                or 
                ( id_tipo_pedido=1 and id_fornecedor in (33, 34) )
                or 
                ( id_tipo_pedido=1 and cidade.flg_distribuidora )
            ) 
        `);

        query.whereRaw(" data>'2021-09-01' ");

        query.whereRaw(' not exists (select * from ms.pedido_baixa where id_pedido=pedido.id and flg_ativo) ');

        if (pedido.id_manifesto) {
            query.where('id_manifesto', pedido.id_manifesto);
        }
        else {
            query.whereNull('id_manifesto');
        }

        if (pedido.order_by == 'cidade') {
            query.orderBy('cidade.descricao');
            query.orderBy('cliente.bairro');
        }
        else {
            query.orderBy('pedido.data');
        }

        return await query;

    }

    async insert(pedido) {
        const result = await this.db()
            .returning('*')
            .insert(pedido);
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


export default PedidoRepository;