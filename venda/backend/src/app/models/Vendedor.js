import BaseModel from "./BaseModel";

export default class Vendedor extends BaseModel {

    static attrs = ['id', 'nome', 'endereco', 'bairro', 'id_estado', 'id_cidade', 'cep', 'rg', 'cpf', 'tel1', 'tel2', 'email', 'cidade', 'uf', 'flg_vend', 'flg_telemarketing', 'flg_vend_d', 'flg_sup_d']

}