import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit  = handleFormSubmit;
  }

  setEventListeners(thisCard, cardId) {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(thisCard, cardId);
    });
  }
}