const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validations');

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:id', validateCardId, deleteCard);

router.put('/:id/likes', validateCardId, likeCard); // поставить лайк карточке

router.delete('/:id/likes', validateCardId, dislikeCard); // убрать лайк с карточки

module.exports = router;
