const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  OngController.create
)

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
      auth: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(35),
      description: Joi.string().required().max(350),
      value: Joi.number().required(),
  }),
}), IncidentController.create);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      ong_id: Joi.string().required().length(8),
    }).unknown(),
  }),
  ProfileController.index
)

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index
);


routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
)

module.exports = routes
