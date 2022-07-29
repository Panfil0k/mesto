import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import initialCards from './initial-сards.js';

const validationConfig = {
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-btn',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__input-error_active',
};

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const popupOverlays = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupImg = document.querySelector('.popup-img');

const closePopupEditProfileBtn = popupEditProfile.querySelector('.popup__close-btn');
const closePopupAddCardBtn = popupAddCard.querySelector('.popup__close-btn');
const closePopupImgBtn = popupImg.querySelector('.popup__close-btn');

const nameInput = popupEditProfile.querySelector('.edit-form__item_el_name');
const jobInput = popupEditProfile.querySelector('.edit-form__item_el_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placesItemContainer = document.querySelector('.places');

const profileForm = document.querySelector('.edit-form-profile');
const cardForm = document.querySelector('.edit-form-card');

const nameCardInput = popupAddCard.querySelector('.edit-form__item_el_card-name');
const srcCardInput = popupAddCard.querySelector('.edit-form__item_el_card-src');

const popupFoto = popupImg.querySelector('.popup-img__foto');
const popupTitle = popupImg.querySelector('.popup-img__title');

/* Открытие\закрытие попапов */
function openPopup (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', handleEscKeyPress);
}

function closePopup (popup) {
  popup.classList.remove('popup_open');
  const formInPopup = popup.querySelector('.edit-form');
  if (formInPopup) {
    formInPopup.reset();
    profileFormValidator.resetValidationForm();
    formAddCardValidator.resetValidationForm();
  }
  document.removeEventListener('keydown', handleEscKeyPress);
}

/* Закрытие попапа по клику на оверлей */
function handlePopupOverlayClick(evt) {
  if(evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

/* Закрытие попапа по кнопке Esc */
function handleEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

/* Передаем в форму редактирования профиля текущие данные и вешаем событие input */
function openEditProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  const eventInput = new Event('input');
  const editProfileInputs = popupEditProfile.querySelectorAll('.edit-form__item');
  editProfileInputs.forEach(input => input.dispatchEvent(eventInput));
}

/* Функция редактирования профиля */
function handleEditProfile (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/* Создаем карточки из класса Card */
initialCards.forEach((item) => {
  const card = new Card(item, '#places-item-template');
  const cardElement = card.generateCard();

  placesItemContainer.append(cardElement);
});

/* Добавление новых карточек */
function handleAddCard (evt) {
  evt.preventDefault();
  const data = { link: srcCardInput.value, name: nameCardInput.value };
  const card = new Card(data, '#places-item-template');
  const cardElement = card.generateCard();
  placesItemContainer.prepend(cardElement);
  
  formAddCardValidator.disableButton();
  closePopup(popupAddCard);
}

/* Добавляем валидацию форм */
const profileFormValidator = new FormValidator(profileForm, validationConfig);
const formAddCardValidator = new FormValidator(cardForm, validationConfig);
 
profileFormValidator.enableValidation();
formAddCardValidator.enableValidation();

/* Слушатели отправки форм */
popupEditProfile.addEventListener('submit', handleEditProfile);
popupAddCard.addEventListener('submit', handleAddCard);

/* Слушатель на кнопку редактирования профиля */
editProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);
  openEditProfilePopup();  
});

/* Слушатель на кнопку добавления карточки */
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

/* Слушатели на кнопки закрытия попапов */
closePopupEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
closePopupImgBtn.addEventListener('click', () => closePopup(popupImg));

/* Слушатель на клик по оверлею */
popupOverlays.forEach((popupOverlay) => {
  popupOverlay.addEventListener('click', handlePopupOverlayClick);
});

export { popupImg, popupFoto, popupTitle, openPopup };