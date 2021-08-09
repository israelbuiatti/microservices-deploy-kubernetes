import BaseRepository from './BaseRepository'
import VendedorRepository from './VendedorRepository'

export class ComissaoRepository extends BaseRepository {

    table = 'pedido';

    async busca(pedido) {

        let query = this.db().orderBy('id', 'asc');

        query.join('cliente', 'pedido.id_cliente', '=', 'cliente.id');
        query.join('cidade', 'cliente.cidade', '=', 'cidade.id');
        query.join('pedido_baixa', 'pedido.id', '=', 'pedido_baixa.id_pedido');

        if (!pedido.vendedor.flg_telemarketing) {
            query.select('pedido.id', 'pedido.data', 'cliente.nome_razao', 'cidade.descricao as descricao_cidade', 'pedido.valor', 'pedido_baixa.valor as valor_baixado', 'pedido_baixa.comissao_vend as comissao');
        }

        if (pedido.vendedor.flg_telemarketing) {
            query.select('pedido.id', 'pedido.data', 'cliente.nome_razao', 'cidade.descricao as descricao_cidade', 'pedido.valor', 'pedido_baixa.valor as valor_baixado', 'pedido_baixa.comissao_tel as comissao');
        }
        

        if (pedido.id_fornecedor) {
            query.whereRaw('pedido.id_fornecedor=' + pedido.id_fornecedor);
        }
        
        if (pedido.id_vendedor && pedido.vendedor.flg_telemarketing) {
            query.whereRaw(`pedido.id_vendedor_tel=${pedido.id_vendedor}`);
        }

        if (pedido.id_vendedor && !pedido.vendedor.flg_telemarketing) {
            query.whereRaw(`pedido.id_vendedor=${pedido.id_vendedor}`);
        }

        if (pedido.data1) {
            query.whereRaw(`pedido_baixa.data>='${pedido.data1}'`);
        }

        if (pedido.data2) {
            query.whereRaw(`pedido_baixa.data <= '${pedido.data2}'`);
        }

        return await query;

    }

}


export default ComissaoRepository;