const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const isURL = require('validator/lib/isURL');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.number().required()
      .messages({
        'number.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'string.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть валидным url-адресом');
    })
      .messages({
        'string.required': 'Поле "trailer" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'Поле "nameEN" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    })
      .messages({
        'string.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.required': 'Поле "movieId" должно быть заполнено',
      }),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }).unknown(true),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
