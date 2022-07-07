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
  popup.addEventListener('click', handlerOverlay);
  document.addEventListener('keydown', handlerEsc);
}

editProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  const eventInput = new Event('input'); // Принудительное событие input для редактирования профиля
  const editProfileInputs = popupEditProfile.querySelectorAll('.edit-form__item');
  editProfileInputs.forEach(input => input.dispatchEvent(eventInput));
});

addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

function closePopup (popup) {
  popup.classList.remove('popup_open');
  if (popup.querySelector('.edit-form')) {
    popup.querySelector('.edit-form').reset();
  }
  popup.removeEventListener('click', handlerOverlay);
  document.removeEventListener('keydown', handlerEsc);
  const errorListInput = Array.from(popup.querySelectorAll('.edit-form__item_type_error'));
  errorListInput.forEach((errorItem) => {
    errorItem.classList.remove('edit-form__item_type_error');
  });
  const errorListSpan = Array.from(popup.querySelectorAll('.edit-form__input-error_active'));
  errorListSpan.forEach((errorItem) => {
    errorItem.classList.remove('edit-form__input-error_active');
  });
}

function handlerOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

function handlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

closePopupEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
closePopupImgBtn.addEventListener('click', () => closePopup(popupImg));

/* Функция редактирования профиля */
function editProfileSubmitHandler (evt) {
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
  
  likeEventListener(placesItemElement);
  openPopupImgListener(placesItemElement);
  deleteEventListener(placesItemElement);
  
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
function handleLike (evt) {
  evt.target.classList.toggle('places__like_active');
}

function likeEventListener(placesItemElement) {
  const likeBtn = placesItemElement.querySelector('.places__like');
  likeBtn.addEventListener('click', handleLike);
}

/* Удаление карточки */
function handleDelete (evt) {
  evt.target.closest('.places__item').remove();
}

function deleteEventListener(placesItemElement) {
  const deleteBtn = placesItemElement.querySelector('.places__delete');
  deleteBtn.addEventListener('click', handleDelete);
}

/* Открытие попапа с фото */
function openPopupImgListener(placesItemElement) {
  const thisImg = placesItemElement.querySelector('.places__foto');
  const thisTitle = placesItemElement.querySelector('.places__name').textContent;

  function openPopupImg() {

    openPopup(popupImg);
  
    popupImage.src = thisImg.src;
    popupImage.alt = thisImg.alt;
    popupTitle.textContent = thisTitle;
    
  }

  thisImg.addEventListener('click', () => openPopupImg(placesItemElement));
}