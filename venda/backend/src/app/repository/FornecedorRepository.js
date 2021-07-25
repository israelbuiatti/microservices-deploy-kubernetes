import BaseRepository from './BaseRepository'

class FornecedorRepository extends BaseRepository {

    table = 'fornecedor';

    async findAll() {
        const results = await this.db()
        // .select('id', 'descricao')
        return results;
    }

    async busca(fornecedor) {

        console.log(fornecedor);

        let query = this.db();

        if (fornecedor.nome_razao) {
            query.whereRaw('LOWER(nome_razao) LIKE ?', '%' + fornecedor.nome_razao.toLowerCase() + '%');
        }

        if (fornecedor.cnpj) {
            query.where('cnpj', fornecedor.cnpj);
        }

        return await query;

    }

    async insert(fornecedor) {
        const result = await this.db()
            .returning('*')
            .insert(fornecedor);
        return result[0];
    }

    async update(fornecedor) {

        const { id } = fornecedor;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(fornecedor);
        return result;
    }


}


export default FornecedorRepository;