export default class Card {
  constructor(data, template, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.places__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placesFoto = this._element.querySelector('.places__foto');
    placesFoto.src = this._link;
    placesFoto.alt = this._name;
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
      this._handleCardClick(this._link, this._name);
    });
  }

  _handleLikeCard() {
    this._element.querySelector('.places__like').classList.toggle('places__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }
}