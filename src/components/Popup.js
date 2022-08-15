export default class Popup {
  constructor({ popupElement}) {
    this._popupElement = document.querySelector(popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup_open')) {
        this.close();
      }
    });
  }
}