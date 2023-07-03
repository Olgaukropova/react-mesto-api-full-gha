const authRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const {
  validateSignIn,
  validateSignUp,
} = require('../middlewares/validations');

authRouter.post('/signin', validateSignIn, login); // аутентификация
authRouter.post('/signup', validateSignUp, createUser);
authRouter.get('/signout', auth, logout);

module.exports = authRouter;
