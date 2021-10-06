import ManifestoRepository from '../repository/ManifestoRepository'
import ManifestoItemRepository from '../repository/ManifestoItemRepository'
import AppError from '../exception/AppError';
import Manifesto from '../models/Manifesto';
import UTIL from '../utils/util';
import PedidoRepository from '../repository/PedidoRepository';

class ManifestoService {

    constructor() {
        this.repository = new ManifestoRepository();
        this.manifestoItemRepository = new ManifestoItemRepository();
        this.pedidoRepository = new PedidoRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async insert(manifesto) {

        this.validar(manifesto);

        const items = manifesto.selecionados;

        manifesto = Manifesto.create(manifesto);

        manifesto = await this.repository.insert(manifesto);

        await this.insertManifestoItem(manifesto, items);

        return manifesto;
    }

    async update(manifesto) {

        this.validar(manifesto);

        const items = manifesto.selecionados;

        manifesto = Manifesto.create(manifesto);

        const result = await this.repository.update(manifesto);

        await this.manifestoItemRepository.inativaManifestoItem(manifesto.id);

        await this.insertManifestoItem(manifesto, items);

        return result;
    }

    async delete(id) {
        await this.repository.delete(id)
        await this.manifestoItemRepository.inativaManifestoItem(id);
    }

    validar(manifesto) {
        manifesto.data = UTIL.reformatDate(manifesto.data);
    }

    async insertManifestoItem(manifesto, items) {

        const itemsToInsert = items.map(item => (
            { id_manifesto: manifesto.id, id_pedido: item.id_pedido }
        ));

        await this.manifestoItemRepository.insert(itemsToInsert);

        for (let x = 0; x < items.length; x++) {
            this.pedidoRepository.update(
                {
                    id: items[x].id_pedido,
                    id_manifesto: manifesto.id
                }
            );
        }

    }



}


export default ManifestoService;