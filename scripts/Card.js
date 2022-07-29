import {openPopup, popupImg, popupFoto, popupTitle} from './index.js';

export class Card {
  constructor(data) {
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#places-item-template')
    .content
    .querySelector('.places__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.places__foto').src = this._link;
    this._element.querySelector('.places__foto').alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.places__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.places__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.places__foto').addEventListener('click', () => {
      this._handleOpenPopupImg();
    });
  }

  _handleLikeCard() {
    this._element.querySelector('.places__like').classList.toggle('places__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenPopupImg() {
    openPopup(popupImg);

    popupFoto.src = this._link;
    popupFoto.alt = this._name;
    popupTitle.textContent = this._name;
  }
}