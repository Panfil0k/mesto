import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleResetValidation }) {
    super({ popupSelector });
    this._handleFormSubmit  = handleFormSubmit;
    this._handleResetValidation = handleResetValidation;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.edit-form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._form = this._popupSelector.querySelector('.edit-form');
    this._form.name.value = data.profileName;
    this._form.job.value = data.profileJob;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.edit-form').reset();
    this._handleResetValidation();
  }
}