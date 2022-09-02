export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/v1/cohort-49/users/me`, {
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  _getCards() {
    return fetch(`${this._baseUrl}/v1/cohort-49/cards`, {
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  getCardsAndUserInfo() {
    return Promise.all([
      this._getUserInfo(),
      this._getCards()
    ])
}

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/v1/cohort-49/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.job
      }),
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  setUserAvatar(dataUser) {
    return fetch(`${this._baseUrl}/v1/cohort-49/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: dataUser.avatarSrc
      }),
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  generateCard(data) {
    return fetch(`${this._baseUrl}/v1/cohort-49/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.cardName,
        link: data.cardSrc
      }),
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/v1/cohort-49/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  setLikeCard(cardId) {
    return fetch(`${this._baseUrl}/v1/cohort-49/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/v1/cohort-49/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '3723867b-28da-4cb2-8322-b6fad88ad8e4',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }
}

