const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
const EmailAlreadyExistError = require('../errors/email-already-exist-err');
const { SALT_ROUNDS, JWT_SECRET_DEV } = require('../utils/env-config');

const {
  NOT_FOUND_ERR,
  BAD_REQUEST_ERR,
  EMAIL_ALREADY_EXIST_ERR,
  LOGOUT_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError(NOT_FOUND_ERR));
      } if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
    new: true,
  })
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError(NOT_FOUND_ERR));
      } if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } if (err.name === 'MongoError' && err.code === 11000) {
        next(new EmailAlreadyExistError(EMAIL_ALREADY_EXIST_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;

  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => {
      const { password, ...publicUser } = user.toObject();
      res.send({ data: publicUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } if (err.name === 'MongoError' && err.code === 11000) {
        next(new EmailAlreadyExistError(EMAIL_ALREADY_EXIST_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { password: hash, ...publicUser } = user.toObject();

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: publicUser });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt')
    .status(200)
    .send({ message: LOGOUT_MESSAGE });
};
