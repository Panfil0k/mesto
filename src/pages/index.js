import './index.css';
import {
  placesItemContainer,
  editProfileBtn,
  addCardBtn,
  profileForm,
  avatarForm,
  cardForm,
  profileAvatar
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const validationConfig = {
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.submit-btn',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__input-error_active',
};

/* Подключаем API */
const api = new Api('https://mesto.nomoreparties.co');

/* Класс отображения информации о пользователе */
const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileJobSelector: '.profile__job', profileAvatarSelector: '.profile__avatar' });

/* Функция создания карточки */
function createCard(data, userId) {
  const card = new Card(data, userId, '#places-item-template', handleCardClick, confirmPopup, handleLikeCard); 
  const cardElement = card.generateCard();

  return cardElement;
}

/* Лайк карточки */
function handleLikeCard(thisCard, cardId) {
  const activeLike = thisCard.querySelector('.places__like').classList.contains('places__like_active');
  if(activeLike === true) {
    api.deleteLikeCard(cardId)
    .then((res) => {
      thisCard.querySelector('.places__like').classList.remove('places__like_active');
      thisCard.querySelector('.places__counter-like').textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  } else {
    api.setLikeCard(cardId)
    .then((res) => {
      thisCard.querySelector('.places__like').classList.add('places__like_active');
      thisCard.querySelector('.places__counter-like').textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }
}

/* Получаем информацию о пользователе и карточки с сервера */
api.getCardsAndUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data[0]);
    userInfo.setUserAvatar(data[0]);

    const defaultCardList = new Section({ 
      items: data[1],
      renderer: (item) => {
        defaultCardList.addItemToEnd(createCard(item, data[0]._id));
      }
    }, placesItemContainer);

    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

/* Попап добавления карточки */
const cardList = new Section({ }, placesItemContainer);

const popupAddCard = new PopupWithForm({ 
  popupSelector: '.popup-add-card',
  handleFormSubmit: (formData) => {
    popupAddCard.renderLoading(true);
    api.generateCard(formData)
      .then((res) => {
        cardList.addItemToBegin(createCard(res, res.owner._id));
        formAddCardValidator.disableButton();
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupAddCard.renderLoading(false, 'Создать'))
  },
  resetValidation: () => {
    formAddCardValidator.resetValidationForm();
  }
});

popupAddCard.setEventListeners();

/* Попап редактирования профиля */
const popupEditProfile = new PopupWithForm({ 
  popupSelector: '.popup-edit-profile',
  handleFormSubmit: (formData) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupEditProfile.renderLoading(false, 'Сохранить'))
  },
  resetValidation: () => {
    profileFormValidator.resetValidationForm();
  }
});

popupEditProfile.setEventListeners();

/* Попап смены аватара */
const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup-edit-avatar',
  handleFormSubmit: (avatarUrl) => {
    popupEditAvatar.renderLoading(true);
    api.setUserAvatar(avatarUrl)
      .then((res) => {
        userInfo.setUserAvatar(res);
        avatarFormValidator.disableButton();
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupEditAvatar.renderLoading(false, 'Сохранить'))
  },
  resetValidation: () => {
    avatarFormValidator.resetValidationForm();
  }
});

popupEditAvatar.setEventListeners();

/* Попап с картинкой */
const popupWithImg = new PopupWithImage({ popupSelector: '.popup-img' });

popupWithImg.setEventListeners();

/* Коллбэк функция для попапа с картинкой */
function handleCardClick(dataCard) {
  popupWithImg.open(dataCard);
}

/* Попап с уточнением об удалении */
const popupWithConfirmDelete = new PopupWithConfirmation({ 
  popupSelector: '.popup-confirm',
  handleFormSubmit: (card, cardId) => {
    api.deleteCard(cardId)
      .then((res) => {
        card.remove();
        card = null;
        popupWithConfirmDelete.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
});

/* Коллбэк функция для удаления карточки */
function confirmPopup(thisCard, cardId) {
  popupWithConfirmDelete.open();
  popupWithConfirmDelete.setEventListeners(thisCard, cardId);
}

/* Добавляем валидацию форм */
const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(avatarForm, validationConfig);
avatarFormValidator.enableValidation();

const formAddCardValidator = new FormValidator(cardForm, validationConfig);
formAddCardValidator.enableValidation();

/* Слушатель на кнопку редактирования профиля */
editProfileBtn.addEventListener('click', function() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

/* Слушатель на иконку редактирования аватара */
profileAvatar.addEventListener('click', () => popupEditAvatar.open());

/* Слушатель на кнопку добавления карточки */
addCardBtn.addEventListener('click', () => popupAddCard.open());