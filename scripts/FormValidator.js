import {popupEditProfile, popupAddCard, handleEditProfile, handleAddCard} from './index.js';

export class FormValidator {
  constructor(formSelector, data) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  enableValidation() {  
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  /* Навешиваем слушатели на все инпуты */
  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    
    this._toggleButtonState(inputList);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValidInput(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  /* Проверка инпута на валидность */
  _isValidInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
      popupEditProfile.removeEventListener('submit', handleEditProfile);
      popupAddCard.removeEventListener('submit', handleAddCard);
    } else {
      this._hideInputError(inputElement);
      popupEditProfile.addEventListener('submit', handleEditProfile);
      popupAddCard.addEventListener('submit', handleAddCard);
    }
  }

  /* Проверка всех инпутов на валидность */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  /* Меняем состояние кнопки в зависимости от валидности инпутов */
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._formSelector.querySelector(this._submitButtonSelector).disabled = true;
    } else {
      this._formSelector.querySelector(this._submitButtonSelector).disabled = false;
    }
  }

  /* Показываем ошибку валидации */
  _showInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  /* Скрываем ошибку валидации */
  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  /* Сброс ошибок валидации при закрытии попапа без сабмита*/
  resetValidationForm() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
