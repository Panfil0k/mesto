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
const placesItemTemplate = document.querySelector('#places-item-template').content;

const nameCardInput = popupAddCard.querySelector('.edit-form__item_el_card-name');
const srcCardInput = popupAddCard.querySelector('.edit-form__item_el_card-src');

const popupImage = popupImg.querySelector('.popup-img__foto');
const popupTitle = popupImg.querySelector('.popup-img__title');

/* Открытие\закрытие попапов */
function openPopup (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', handlerEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_open');
  const formInPopup = popup.querySelector('.edit-form');
  if (formInPopup) {
    formInPopup.reset();
  }
  document.removeEventListener('keydown', handlerEsc);
  
  const {inputErrorClass, errorClass} = configValidation;
  const errorListInput = Array.from(popup.querySelectorAll(`.${inputErrorClass}`));
  errorListInput.forEach((errorItem) => {
    errorItem.classList.remove(inputErrorClass);
  });
  const errorListSpan = Array.from(popup.querySelectorAll(`.${errorClass}`));
  errorListSpan.forEach((errorItem) => {
    errorItem.classList.remove(errorClass);
  });
}

/* Закрытие попапа по клику на оверлей */
function handlerOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

/* Закрытие попапа по кнопке Esc */
function handlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

/* Передаем в форму редактирования профиля текущие данные и вешаем событие input */
function editProfileContent () {
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

/* Создание карточки */
function createCard(src, title) {
  const placesItemElement = placesItemTemplate.cloneNode(true);
  
  placesItemElement.querySelector('.places__foto').src = src;
  placesItemElement.querySelector('.places__foto').alt = title;
  placesItemElement.querySelector('.places__name').textContent = title;
  
  bindLikeCardListener(placesItemElement);
  bindOpenCardImgListener(placesItemElement);
  bindDeleteCardListener(placesItemElement);
  
  return placesItemElement
}

/* Берем Template и подгружам карточки из массива на страницу */
initialCards.forEach(function (place) {
  placesItemContainer.append(createCard(place.link, place.name));
});

/* Добавление новых карточек */
function addCardSubmitHandler (evt) {
  evt.preventDefault();
  
  placesItemContainer.prepend(createCard(srcCardInput.value, nameCardInput.value));
  
  closePopup(popupAddCard);
}

/* Лайк карточки */
function bindLikeCardListener(placesItemElement) {
  const likeButton = placesItemElement.querySelector('.places__like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('places__like_active');
  });
}

/* Удаление карточки */
function bindDeleteCardListener(placesItemElement) {
  const deleteButton = placesItemElement.querySelector('.places__delete');
  const card = placesItemElement.querySelector('.places__item');
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
}

/* Открытие попапа с фото */
function bindOpenCardImgListener(placesItemElement) {
  const thisImg = placesItemElement.querySelector('.places__foto');
  const thisTitle = placesItemElement.querySelector('.places__name').textContent;

  function openPopupImg() {

    openPopup(popupImg);
  
    popupImage.src = thisImg.src;
    popupImage.alt = thisImg.alt;
    popupTitle.textContent = thisTitle;
    
  }

  thisImg.addEventListener('click', openPopupImg);
}

/* Слушатель на кнопку редактирования профиля */
editProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);
  editProfileContent();  
});

/* Слушатель на кнопку добавления карточки */
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

/* Слушатели на кнопки закрытия попапов */
closePopupEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
closePopupImgBtn.addEventListener('click', () => closePopup(popupImg));

/* Слушатель на клик по оверлею */
popupOverlays.forEach((popupOverlay) => {
  popupOverlay.addEventListener('click', handlerOverlay);
});