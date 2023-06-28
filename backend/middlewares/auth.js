const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  let payload;
  // jwt.verify вернёт пейлоуд токена, если тот прошёл проверку
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err, 'auth');
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = auth;
