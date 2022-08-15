import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open(link, name) {
    const popupFoto = this._popupSelector.querySelector('.popup-img__foto');
    const popupTitle = this._popupSelector.querySelector('.popup-img__title');
    popupFoto.src = link;
    popupFoto.alt = name;
    popupTitle.textContent = name;
    super.open();
  }
}