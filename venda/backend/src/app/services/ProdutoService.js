import ProdutoRepository from '../repository/ProdutoRepository'
import AppError from '../exception/AppError';

class ProdutoService {

    constructor() {
        this.repository = new ProdutoRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async busca(produto) {
        return await this.repository.busca(produto);
    }

    async insert(produto) {

        this.validar(produto);

        const result = await this.repository.insert(produto);
        return result;
    }

    async update(produto) {

        if (!produto.id) throw new AppError("Campo ID obrigatório!");
        this.validar(produto);

        const result = await this.repository.update(produto);
        return result;
    }

    async delete(id) {
        const result = await this.repository.findById(id);
        if (!result) throw new AppError("Registro não encontrado.");

        await this.repository.delete(id);
    }

    validar(produto) {
        if (!produto.descricao) throw new AppError("Campo Descrição obrigatório!");
    }


}


export default ProdutoService;