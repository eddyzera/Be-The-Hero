const express = require('express');
const OngController = require('./controller/ongController');
const IncidentController = require('./controller/incidentController');
const ProfileController = require('./controller/profilleController');
const SessionController = require('./controller/sessionController');

const routes = express.Router();

//Session
routes.post('/session', SessionController.create)

// Ong
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.show);
routes.put('/ongs/:ongId', OngController.update);
routes.delete('/ongs/:ongId', OngController.destroy);

//Incident
routes.post('/ong/incident', IncidentController.create);
routes.get('/ong/incident', IncidentController.index);
routes.delete('/ong/incident/:incidentId', IncidentController.destroy);

//Profile
routes.get('/ong/profile', ProfileController.index);

module.exports = routes;