
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate')
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());
/*
Metodos HTTP

GET - Buscar/listar uma informação do back-end
POST - Criar uma informação do back-end
PUT - Alterar uma informação do back-end
DELETE - Deletar uma informação do back-end
*/

/*
Tipos de parametros

* Query params: paramentros nomeados enviados na rota após o simbolo ? e 
servem para (filtros, paginação).
* Route params: Paramentros utilizados para identificar recursos
*Request Body: O corpo da requisição
*/

/** 
 * Driver: Selelect * From users
 * Query Builder: tabela('users').select('*').where
*/

module.exports = app;