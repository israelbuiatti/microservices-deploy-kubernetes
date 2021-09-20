import BaseModel from "./BaseModel";

export default class Fornecedor extends BaseModel {

    static attrs = ['id', 'nome_razao', 'endereco', 'bairro', 'id_cidade', 'id_estado', 'cep', 'cnpj', 'cgf',
        'comissao_repr', 'comissao_vend', 'comissao_tel', 'cidade', 'uf', 'comissao_vend_d', 'comissao_sup_d']


}