const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getInfoUser,
} = require('../controllers/users');

const {
  validateUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers); // информация о всех пользователях

router.get('/me', getInfoUser); // информация о текущем пользователе

router.get('/:id', validateUserById, getUserById); // поиск пользователя по id

router.patch('/me/', validateUpdateUser, updateUser); // обновляет профиль

router.patch('/me/avatar/', validateUpdateAvatar, updateAvatar); // обновляет аватар

module.exports = router;
