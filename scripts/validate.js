const configValidation = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-btn',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__input-error_active'
};

/* Показываем ошибку валидации */
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}; 

/* Скрываем ошибку валидации */
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}; 

/* Проверка инпута на валидность */
const isValidInput = (formElement, inputElement, { inputErrorClass, errorClass, ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass, ...rest });
    popupEditProfile.removeEventListener('submit', handleEditProfile);
    popupAddCard.removeEventListener('submit', handleAddCard);
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass, ...rest });
    popupEditProfile.addEventListener('submit', handleEditProfile);
    popupAddCard.addEventListener('submit', handleAddCard);
  }
};

/* Проверка всех инпутов на валидность */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
  
/* Меняем состояние кнопки в зависимости от валидности инпутов */
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

/* Навешиваем слушатели на все инпуты */
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValidInput(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

/* Навешиваем валидацию на все формы */
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    setEventListeners(formElement, rest);
  });
};
  
enableValidation(configValidation);