import { API_URL } from './constants';

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._options = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(url) {
    //проверка тела в запросах с методом GET и DELETE
    if (this._options.method.includes('GET') || this._options.method.includes('DELETE')) {
      //если есть тело - удалим
      if ('body' in this._options) delete this._options.body;
    }

    return fetch(url, this._options).then(this._checkResponse);
  }

  //запрос данных о пользователе с сервера
  getUserInfo() {
    this._options.method = 'GET';
    return this._fetch(this._baseUrl + '/users/me');
  }

  //загрузка карточек из массива
  getInitialCards() {
    this._options.method = 'GET';
    return this._fetch(`${this._baseUrl}/cards`);
  }

  changeUserInfo(data) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify(data);
    return this._fetch(`${this._baseUrl}/users/me`);
  }

  //запрос на добавление карточки
  addCard(data) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify(data);
    return this._fetch(`${this._baseUrl}/cards`);
  }

  //Попап удаления карточки
  removeCard(cardId) {
    this._options.method = 'DELETE';
    return this._fetch(`${this._baseUrl}/cards/${cardId}`);
  }

  //постановка лайка
  addLike(cardId) {
    this._options.method = 'PUT';
    return this._fetch(`${this._baseUrl}/cards/${cardId}/likes`);
  }

  //удаление лайка
  deleteLike(cardId) {
    this._options.method = 'DELETE';
    return this._fetch(`${this._baseUrl}/cards/${cardId}/likes`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    this._options.method = !isLiked ? 'PUT' : 'DELETE';
    return this._fetch(`${this._baseUrl}/cards/${cardId}/likes`);
  }

  //изменить аватар
  setUserAvatar(data) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify(data);
    return this._fetch(`${this._baseUrl}/users/me/avatar`);
  }
}

export const api = new Api({
  baseUrl: API_URL,
  // headers: {
  //   authorization: '629ebaab-fdf2-4b22-852e-63a8619f4529',
  //   'Content-Type': 'application/json',
  // },
});