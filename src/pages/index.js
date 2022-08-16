import './index.css';
import {
  initialCards,
  placesItemContainer,
  editProfileBtn,
  addCardBtn,
  profileForm,
  cardForm
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const validationConfig = {
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-btn',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__input-error_active',
};

/* Функция создания карточки */
function createCard(data) {
  const card = new Card(data, '#places-item-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

/* Добавление дефолтных карточек */
const defaultCardList = new Section({ 
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItemToEnd(createCard(item));
  }

}, placesItemContainer);

defaultCardList.renderItems();

/* Класс отображения информации о пользователе */
const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileJobSelector: '.profile__job' });

/* Попап редактирования профиля */
const popupEditProfile = new PopupWithForm({ 
  popupSelector: '.popup-edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupEditProfile.close();
  },
  resetValidation: () => {
    profileFormValidator.resetValidationForm();
  }
});

popupEditProfile.setEventListeners();

/* Попап добавления карточки */
const popupAddCard = new PopupWithForm({ 
  popupSelector: '.popup-add-card',
  handleFormSubmit: (formData) => {
    const data = { link: formData.cardSrc, name: formData.cardName };
    defaultCardList.addItemToBegin(createCard(data));
    formAddCardValidator.disableButton();
    popupAddCard.close();
  },
  resetValidation: () => {
    formAddCardValidator.resetValidationForm();
  }
});

popupAddCard.setEventListeners();

/* Попап с картинкой */
const popupWithImg = new PopupWithImage({ popupSelector: '.popup-img' });

popupWithImg.setEventListeners();

/* Коллбэк функция для попапа с картинкой */
function handleCardClick(dataCard) {
  popupWithImg.open(dataCard);
}

/* Добавляем валидацию форм */
const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();

const formAddCardValidator = new FormValidator(cardForm, validationConfig);
formAddCardValidator.enableValidation();

/* Слушатель на кнопку редактирования профиля */
editProfileBtn.addEventListener('click', function() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

/* Слушатель на кнопку добавления карточки */
addCardBtn.addEventListener('click', () => popupAddCard.open());