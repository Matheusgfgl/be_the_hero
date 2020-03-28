
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('casos').count();

        console.log(count);

        const incidents = await connection('casos')
        .join('ongs' , 'ongs.id', '=' , 'casos.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['casos.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city','ongs.uf']);

        response.header('X-total_count', count['count(*)']);

        return response.json(incidents);
    },

    async create (request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
   
        const [id] = await connection('casos').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id})
    },

    async delete(request, response) {

        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('casos')
        .where('id', id)
        .select('ong_id')
        .first();

        if(ong_id != incident.ong_id)
        {
            return response.status(401).json({error: 'Operation not permited'});

        }
        await connection('casos').where('id',id).delete();

        return response.status(204).send();
    }
};