import BaseModel from "./BaseModel";

export default class PedidoCobranca extends BaseModel {

    static attrs = ['id', 'id_pedido', 'obs', 'data', 'valor']


}