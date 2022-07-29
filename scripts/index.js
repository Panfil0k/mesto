import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const data = {
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-btn',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__input-error_active',
};

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1468&q=80'
  },
  {
    name: 'Республика Коми',
    link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
  },
  {
    name: 'Тюмень',
    link: 'https://images.unsplash.com/photo-1621878983992-bac95a1e8dd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
  },
  {
    name: 'Таганай',
    link: 'https://images.unsplash.com/photo-1521531105925-7c51dffd5098?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
  },
  {
    name: 'Оренбург',
    link: 'https://images.unsplash.com/photo-1601237136101-303aae60375e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
  }
];

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const popupOverlays = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupImg = document.querySelector('.popup-img'); // забрал в Кард

const closePopupEditProfileBtn = popupEditProfile.querySelector('.popup__close-btn');
const closePopupAddCardBtn = popupAddCard.querySelector('.popup__close-btn');
const closePopupImgBtn = popupImg.querySelector('.popup__close-btn');

const nameInput = popupEditProfile.querySelector('.edit-form__item_el_name');
const jobInput = popupEditProfile.querySelector('.edit-form__item_el_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placesItemContainer = document.querySelector('.places');

const Profileform = document.querySelector('.edit-form-profile');
const Cardform = document.querySelector('.edit-form-card');

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
    const validateForm = new FormValidator(popup, data);
    validateForm.resetValidationForm(inputList);
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
  const card = new Card(item);
  const cardElement = card.generateCard();

  placesItemContainer.append(cardElement);
});

/* Добавление новых карточек */
function handleAddCard (evt) {
  evt.preventDefault();
  const data = { link: srcCardInput.value, name: nameCardInput.value };
  const card = new Card(data);
  const cardElement = card.generateCard();
  placesItemContainer.prepend(cardElement);
  
  closePopup(popupAddCard);
}

/* Добавляем валидацию форм */
const validateProfileForm = new FormValidator(Profileform, data);
const validateCardForm = new FormValidator(Cardform, data);
 
validateProfileForm.enableValidation();
validateCardForm.enableValidation();

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

export { popupEditProfile, popupAddCard, popupImg, popupFoto, popupTitle, openPopup, handleEditProfile, handleAddCard };