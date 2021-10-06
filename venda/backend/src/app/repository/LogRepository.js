import BaseRepository from './BaseRepository'

class LogRepository extends BaseRepository {

    table = 'log';
    schema = "log";

    async insert(cliente) {
        const result = await this.db()
            .returning('*')
            .insert(cliente);
        return result[0];
    }

}


export default LogRepository;