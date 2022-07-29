export class FormValidator {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  enableValidation() {  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  /* Навешиваем слушатели на все инпуты */
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    
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
    } else {
      this._hideInputError(inputElement);
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
      this._formElement.querySelector(this._submitButtonSelector).disabled = true;
    } else {
      this._formElement.querySelector(this._submitButtonSelector).disabled = false;
    }
  }

  /* Сброс активной кнопки сабмита */
  disableButton() {
    this._formElement.querySelector(this._submitButtonSelector).disabled = true;
  }

  /* Показываем ошибку валидации */
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  /* Скрываем ошибку валидации */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  /* Сброс ошибок валидации при закрытии попапа без сабмита*/
  resetValidationForm() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
