import BaseModel from "./BaseModel";

export default class PedidoItem extends BaseModel {

    static attrs = ['id', 'id_pedido', 'id_produto', 'quantidade', 'valor_unitario']


}