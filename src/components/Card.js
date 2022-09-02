export default class Card {
  constructor(data, userId, template, handleCardClick, confirmPopup, handleLikeCard) {
    this._dataCard = data;
    this._cardId = data._id;
    this._link = data.link;
    this._name = data.name;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this.userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._confirmPopup = confirmPopup;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.places__item')
    .cloneNode(true);

    return cardElement;
  }

  _showDeleteBtn() {
    this._elementDeleteBtn.classList.add('places__delete_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._elementPhoto = this._element.querySelector('.places__foto');
    this._like = this._element.querySelector('.places__like');
    this._counterLikes = this._element.querySelector('.places__counter-like');
    this._elementDeleteBtn = this._element.querySelector('.places__delete');

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;

    if(this._owner === this.userId) {
      this._showDeleteBtn();
    }

    if(this._likes) {
      this._countLikesCard();
    }

    this._checkLikes();

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeCard(this._element, this._cardId);
    });

    this._elementDeleteBtn.addEventListener('click', () => {
      this._confirmPopup(this._element, this._cardId);
    });

    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._dataCard);
    });
  }

  _countLikesCard() {
    this._counterLikes.textContent = this._likes.length;
  }

  _checkLikes() {
    this._likes.forEach(item => {
      if(item._id === this.userId) {
        this._like.classList.add('places__like_active');
      }
    })
  }
}