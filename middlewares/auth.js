const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/env-config');
const AuthError = require('../errors/auth-err');
const { UNAUTHORIZED_ERR } = require('../utils/constants');

const handleAuthError = () => {
  throw new AuthError(UNAUTHORIZED_ERR);
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log(token);
    return handleAuthError();
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
    console.log(payload);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
