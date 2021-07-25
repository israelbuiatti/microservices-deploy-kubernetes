import BaseModel from "./BaseModel";

export default class Cliente extends BaseModel {

    static attrs = ['id', 'nome_razao', 'cnpj', 'comprador', 'endereco', 'bairro', 'id_cidade', 'id_estado',
        'cep', 'cgf', 'tel1', 'tel2', 'fax', 'flg_ativo', 'id_regiao', 'obs', 'banco1', 'banco2', 'inf1', 'inf2', 'inf3', 'cidade', 'uf']


}