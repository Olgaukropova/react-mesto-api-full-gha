const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./login');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указанный путь не найден.')));

module.exports = router;
