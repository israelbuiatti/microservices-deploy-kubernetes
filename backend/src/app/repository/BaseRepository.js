import knex from '../../database';
import AppError from '../exception/AppError';

export default class BaseRepository {
    schema = "ms";
    table = null;

    db() {
        return knex(this.table).withSchema(this.schema);
    }

    async findById(id) {
        const result = await this.db().where('id', id).first();

        if (!result) throw new AppError("Registro não encontrado!");

        return result;
    }

}