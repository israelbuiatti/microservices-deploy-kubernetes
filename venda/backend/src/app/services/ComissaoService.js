import ComissaoRepository from '../repository/ComissaoRepository'
import VendedorRepository from '../repository/VendedorRepository'
import FornecedorRepository from '../repository/FornecedorRepository'
import UTIL from '../utils/util';

class ComissaoService {

    constructor() {
        this.repository = new ComissaoRepository();
        this.repositoryVendedor = new VendedorRepository();
        this.repositoryFornecedor = new FornecedorRepository();
    }

    async busca(pedido) {

        pedido.id_tipo_pedido = 1;

        const vendedor = await this.repositoryVendedor.findById(pedido.id_vendedor);
        const fornecedor = await this.repositoryFornecedor.findById(pedido.id_fornecedor);

        pedido.vendedor = vendedor;

        pedido.data1 = UTIL.reformatDate(pedido.data1);
        pedido.data2 = UTIL.reformatDate(pedido.data2);


        let result = {};

        if (!vendedor.flg_telemarketing) {
            result.comissao = fornecedor.comissao_vend;
        }
        if (vendedor.flg_telemarketing) {
            result.comissao = fornecedor.comissao_tel;
        }
        
        result.lista = await this.repository.busca(pedido);

        return result
    }

    async buscad(pedido) {

        pedido.id_tipo_pedido = 2;

        const vendedor = await this.repositoryVendedor.findById(pedido.id_vendedor);

        pedido.vendedor = vendedor;

        pedido.data1 = UTIL.reformatDate(pedido.data1);
        pedido.data2 = UTIL.reformatDate(pedido.data2);


        let result = {};

        result.lista = await this.repository.busca(pedido);

        return result
    }

}


export default ComissaoService;