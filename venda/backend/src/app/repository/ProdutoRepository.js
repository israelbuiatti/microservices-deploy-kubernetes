import BaseRepository from './BaseRepository'

class ProdutoRepository extends BaseRepository {

    table = 'produto';

    async findAll() {
        const results = await this.db().orderBy('id_fornecedor, descricao');
        // .select('id', 'descricao')
        return results;
    }

    async busca(produto) {

        let query = this.db().orderBy('descricao');

        if (produto.descricao) {
            query.whereRaw('LOWER(descricao) LIKE ?', '%' + produto.descricao.toLowerCase() + '%');
        }

        if (produto.id_fornecedor) {
            //query.where('id_fornecedor', produto.id_fornecedor);
        }
        
        if (produto.flg_distribuidora) {
            query.where('flg_distribuidora', true);
        }

        return await query;

    }

    async insert(produto) {
        const result = await this.db()
            .returning('*')
            .insert(produto);
        return result;
    }

    async update(produto) {

        const { id } = produto;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(produto);
        return result;
    }


}


export default ProdutoRepository;