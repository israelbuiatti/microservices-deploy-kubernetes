import ClienteRepository from '../repository/ClienteRepository'
import AppError from '../exception/AppError';
const axios = require('axios');

class ClienteService {

    constructor() {
        this.repository = new ClienteRepository();
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        return result;
    }

    async findAll() {
        const results = await this.repository.findAll();
        return results;
    }

    async busca(cliente) {
        return await this.repository.busca(cliente);
    }

    async insert(cliente) {

        this.validar(cliente);

        const result = await this.repository.insert(cliente);
        return result;
    }

    async update(cliente) {

        if (!cliente.id) throw new AppError("Campo ID obrigatório!");
        this.validar(cliente);

        const result = await this.repository.update(cliente);
        return result;
    }

    async delete(id) {
        const result = await this.repository.findById(id);
        if (!result) throw new AppError("Registro não encontrado.");

        await this.repository.delete(id);
    }

    validar(cliente) {
        if (!cliente.nome_razao) throw new AppError("Campo Nome Razão obrigatório!");
        if (!cliente.cnpj) throw new AppError("Campo CNPJ obrigatório!");
    }


    async sintegra(cnpj) {

        let url;
        let result;

        url = 'https://api.cnpja.com/office/' + cnpj + '?registrations=CE';
        result = await this.sintegraCall(url);

        if (result.status == 200) return result;

        url = 'https://api.cnpja.com/office/' + cnpj;
        result = await this.sintegraCall(url);

        return result;

    }

    async sintegraCall(url) {

        //https://docs.cnpja.com/api/quickstart/#inscri%C3%A7%C3%B5es-estaduais
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': process.env.SINTEGRA_TOKEN
            }
        };

        let result = {};

        await axios(config)
            .then(function (response) {
                result.status = 200;
                result.data = response.data;
                //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response.data);
                result.status = error.response.data.code
                result.data = error.response.data;
            });
        return result;
    }


}


export default ClienteService;