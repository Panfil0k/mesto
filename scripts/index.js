const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

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

/* Открытие\закрытие попапов */
function openPopup (popup) {
  popup.classList.add('popup_open');
}

editProfileBtn.addEventListener('click', () => openPopup(popupEditProfile));
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

function closePopup (popup) {
  popup.classList.remove('popup_open');
}

closePopupEditProfileBtn.addEventListener('click', () => closePopup(popupEditProfile));
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));
closePopupImgBtn.addEventListener('click', () => closePopup(popupImg))

/* Функция редактирования профиля */
function editProfileSubmitHandler (evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  nameInput.value = newName;
  jobInput.value = newJob;
  closePopup(popupEditProfile);
}

popupEditProfile.addEventListener('submit', editProfileSubmitHandler);

/* Массив карточек */
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

/* Определяем Template и подгружам карточки из массива на страницу */
const placesItemContainer = document.querySelector('.places');
const placesItemTemplate = document.querySelector('#places-item-template').content;

initialCards.forEach(function (place) {
  const placesItemElement = placesItemTemplate.querySelector('.places__item').cloneNode(true);
  
  placesItemElement.querySelector('.places__foto').src = place.link;
  placesItemElement.querySelector('.places__foto').alt = place.name;
  placesItemElement.querySelector('.places__name').textContent = place.name;
  
  likeEventListener(placesItemElement);
  openPopupImgListener(placesItemElement);
  deleteEventListener(placesItemElement);

  placesItemContainer.append(placesItemElement);
});

/* Добавление новых карточек */
const nameCardInput = popupAddCard.querySelector('.edit-form__item_el_card-name');
const srcCardInput = popupAddCard.querySelector('.edit-form__item_el_card-src');

function addCardSubmitHandler (evt) {
  evt.preventDefault();

  let newCardName = nameCardInput.value;
  let newSrc = srcCardInput.value;

  const placesItemElement = placesItemTemplate.querySelector('.places__item').cloneNode(true);
  
  placesItemElement.querySelector('.places__foto').src = newSrc;
  placesItemElement.querySelector('.places__foto').alt = newCardName;
  placesItemElement.querySelector('.places__name').textContent = newCardName;

  likeEventListener(placesItemElement);
  openPopupImgListener(placesItemElement);
  deleteEventListener(placesItemElement);

  placesItemContainer.prepend(placesItemElement);
  
  nameCardInput.value = '';
  srcCardInput.value = '';

  closePopup(popupAddCard);
}

popupAddCard.addEventListener('submit', addCardSubmitHandler);

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
function openPopupImg (evt) {

  openPopup(popupImg);

  let newSrc = evt.target.src;
  let popupImage = popupImg.querySelector('.popup-img__foto');
  popupImage.src = newSrc;

  let thisItem = evt.target.closest('.places__item');
  let newTitle = thisItem.querySelector('.places__name').textContent;
  let popupTitle = popupImg.querySelector('.popup-img__title');
  popupTitle.textContent = newTitle;
}

function openPopupImgListener(placesItemElement) {
  const imgSmall = placesItemElement.querySelector('.places__foto');
  imgSmall.addEventListener('click', openPopupImg);
}








  
