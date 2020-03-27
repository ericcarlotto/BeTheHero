const express = require('express');

const ongController = require('./controllers/ongController');
const casesController = require('./controllers/casesController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);

routes.get('/cases', casesController.index);
routes.post('/cases', casesController.create);
routes.delete('/cases/:id', casesController.delete)

module.exports = routes;