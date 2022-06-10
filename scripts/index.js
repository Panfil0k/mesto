let editProfileBtn = document.querySelector('.profile__edit-btn');
let editForm = document.querySelector('.edit-form');
let closeEditFormBtn = editForm.querySelector('.edit-form__reset-btn');
let saveEditFormBtn = editForm.querySelector('.edit-form__submit-btn');
let fixBody = document.querySelector('.page');
let nameInput = editForm.querySelector('.edit-form__item_el_name');
let jobInput = editForm.querySelector('.edit-form__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function visibleEditForm() {
  editForm.classList.remove('form-overlay_close');
  fixBody.classList.add('fixed');
};

editProfileBtn.addEventListener('click', visibleEditForm);

function closeEditForm() {
  editForm.classList.add('form-overlay_close');
  fixBody.classList.remove('fixed');
};

closeEditFormBtn.addEventListener('click', closeEditForm);

function formSubmitHandler (evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  editForm.classList.add('form-overlay_close');
  fixBody.classList.remove('fixed');
}

editForm.addEventListener('submit', formSubmitHandler);

