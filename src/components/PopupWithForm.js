import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupElement, handleFormSubmit, resetValidation }) {
    super({ popupElement });
    this._handleFormSubmit  = handleFormSubmit;
    this._resetValidation = resetValidation;
    this._inputList = this._popupElement.querySelectorAll('.edit-form__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data, firstValue, secondValue) {
    firstValue.value = data.profileName;
    secondValue.value = data.profileJob;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupElement.querySelector('.edit-form').reset();
    this._resetValidation();
  }
}