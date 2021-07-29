import ComissaoRepository from '../repository/ComissaoRepository'
import VendedorRepository from '../repository/VendedorRepository'
import UTIL from '../utils/util';

class ComissaoService {

    constructor() {
        this.repository = new ComissaoRepository();
        this.repositoryVendedor = new VendedorRepository();
    }

    async busca(pedido) {

        const vendedor = await this.repositoryVendedor.findById(pedido.id_vendedor);

        pedido.vendedor = vendedor;

        pedido.data1 = UTIL.reformatDate(pedido.data1);
        pedido.data2 = UTIL.reformatDate(pedido.data2);

        return await this.repository.busca(pedido);
    }

}


export default ComissaoService;