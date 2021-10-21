import BaseRepository from './BaseRepository'

class ClienteRepository extends BaseRepository {

    table = 'cliente';

    async teste() {
        const results = await this.db().where('validado', false).whereNotNull('cnpj').orderBy('id', 'desc')
        // .select('id', 'nome_razao')
        return results;
    }

    async findAll() {
        const results = await this.db().limit(50).orderBy('nome_razao')
        // .select('id', 'nome_razao')
        return results;
    }

    async busca(cliente) {

        let query = this.db().limit(50);

        query.join('cidade', 'cliente.cidade', '=', 'cidade.id')

        query.select('cliente.*', 'cidade.descricao as descricao_cidade')

        if (cliente.nome_razao) {
            query.whereRaw('LOWER(unaccent(nome_razao)) LIKE unaccent(?)', '%' + cliente.nome_razao.toLowerCase() + '%');
        }

        if (cliente.cnpj) {
            query.where('cnpj', cliente.cnpj);
        }

        if (cliente.cidade) {
            query.where('cidade', cliente.cidade);
        }

        if (cliente.id_regiao) {
            query.whereRaw('cliente.id_regiao='+cliente.id_regiao);
        }

        return await query;

    }

    async insert(cliente) {
        const result = await this.db()
            .returning('*')
            .insert(cliente);
        return result[0];
    }

    async update(cliente) {

        const { id } = cliente;

        await this.findById(id);

        const result = await this.db()
            .where({ id })
            .update(cliente);
        return result;
    }

}


export default ClienteRepository;