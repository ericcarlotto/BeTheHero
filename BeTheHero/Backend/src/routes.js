const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController');
const casesController = require('./controllers/casesController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(9).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);

routes.get('/cases', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), casesController.index);

routes.post('/cases', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().max(500),
        value: Joi.number().required(),
    }),
}), casesController.create);

routes.delete('/cases/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), casesController.delete);

module.exports = routes;