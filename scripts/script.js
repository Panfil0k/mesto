let editProfileBtn = document.querySelector('.profile__edit-btn');
let closeEditFormBtn = document.querySelector('.edit-form__reset-btn');

function visibleEditForm() {
  let editForm = document.querySelector('.edit-form');
  editForm.classList.remove('form-overlay_close');
};

editProfileBtn.addEventListener('click', visibleEditForm);

function closeEditForm() {
  let editForm = document.querySelector('.edit-form');
  editForm.classList.add('form-overlay_close');
};

closeEditFormBtn.addEventListener('click', closeEditForm);