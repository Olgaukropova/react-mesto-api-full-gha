const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  let payload;
  // jwt.verify вернёт пейлоуд токена, если тот прошёл проверку
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
