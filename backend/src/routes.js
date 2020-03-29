const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controller/ongController');
const IncidentController = require('./controller/incidentController');
const ProfileController = require('./controller/profilleController');
const SessionController = require('./controller/sessionController');

const routes = express.Router();

//Session
routes.post('/session', SessionController.create)

/**
 * ONGs
 */
routes.post('/ongs/create',

    celebrate({

        [Segments.BODY]: Joi.object().keys({

            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2)

        })

    })
, OngController.create);

routes.get('/ongs', OngController.show);
routes.put('/ongs/:ongId', OngController.update);
routes.delete('/ongs/:ongId', OngController.destroy);

//Incident
routes.post('/ong/incident/create',

    celebrate({

        [Segments.BODY]: Joi.object().keys({

            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required()

        }),

        [Segments.HEADERS]: Joi.object().keys({

            authorization: Joi.string().required()

        }).unknown()
    }) 
, IncidentController.create);

routes.get('/ong/incident', 

    celebrate({

        [Segments.QUERY]: Joi.object().keys({

            page: Joi.number()

        })

    })

, IncidentController.index);

routes.delete('/ong/incident/:incidentId',

    celebrate({

        [Segments.PARAMS]: Joi.object().keys({

            id: Joi.number().required()

        })

    }) 
, IncidentController.destroy);

//Profile
routes.get('/ong/profile',

    celebrate({

        [Segments.HEADERS]: Joi.object().keys({

            authorization: Joi.string().required()

        }).unknown()

    })

, ProfileController.index);

module.exports = routes;