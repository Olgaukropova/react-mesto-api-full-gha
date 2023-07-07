const Card = require('../models/cards');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Вы ввели некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужую карточку.'));
      }
      return Card
        .deleteOne(card)
        .then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => res.send({ card, message: 'Лайк успешно поставлен' }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => res.send({ card, message: 'Лайк удален' }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
