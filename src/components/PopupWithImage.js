import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupElement }) {
    super({ popupElement });
    this._popupPhoto = this._popupElement.querySelector('.popup-img__foto');
    this._popupTitle = this._popupElement.querySelector('.popup-img__title');
  }

  open(dataCard) {  
    this._popupPhoto.src = dataCard.link;
    this._popupPhoto.alt = dataCard.name;
    this._popupTitle.textContent = dataCard.name;
    super.open();
  }
}