const express = require('express');


const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SectionController = require('./controller/SectionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs',  OngController.create);

routes.post('/sections',  SectionController.create);

routes.get('/profile', ProfileController.index)

routes.get('/casos', IncidentController.index);
routes.post('/casos', IncidentController.create);
routes.delete('/casos/:id', IncidentController.delete);


module.exports = routes;