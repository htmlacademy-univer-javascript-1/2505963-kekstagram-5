import {isEscapeKey} from './util.js';

const FORM_ERRORS = [
  'Описание до 140 символов',
  'Превышено количество хэш-тегов',
  'Хэш-теги повторяются',
  'Введён невалидный хэш-тег'
];
const HASHTAG_MASK = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const photoInputBtn = form.querySelector('.img-upload__input');
const formCancel = form.querySelector('.img-upload__cancel');
const postEditForm = form.querySelector('.img-upload__overlay');
const hashtagsInput = postEditForm.querySelector('.text__hashtags');
const descriptionInput = postEditForm.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'error-message'
});

function validateDescription (value) {
  return value.length <= 140;
}
pristine.addValidator(descriptionInput, validateDescription, FORM_ERRORS[0]);

function validateHashtagsCount (value) {
  return value.split(' ').length <= 5;
}
pristine.addValidator(hashtagsInput, validateHashtagsCount, FORM_ERRORS[1]);

function validateHashtagRepeating (value) {
  const hashtags = value.trim().toLowerCase().split(' ');
  const set = new Set();

  for (let i = 0; i < hashtags.length; i++) {
    set.add(hashtags[i]);
  }

  return hashtags.length === set.size;
}
pristine.addValidator(hashtagsInput, validateHashtagRepeating, FORM_ERRORS[2]);

function validateHashtags (value) {
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (HASHTAG_MASK.test(hashtags[i]) === false) {
      return false;
    }
  }
  return true;
}
pristine.addValidator(hashtagsInput, validateHashtags, FORM_ERRORS[3]);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

function cancelDocumentKeyDown (evt) {
  evt.stopPropagation();
}

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onFormCancel();
  }
};

function onFormCancel () {
  postEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();

  document.removeEventListener('keydown', onDocumentKeyDown);
  form.removeEventListener('submit', onFormSubmit);
  hashtagsInput.removeEventListener('keydown', cancelDocumentKeyDown);
  descriptionInput.removeEventListener('keydown', cancelDocumentKeyDown);
}

const onPhotoInput = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
  body.classList.add('modal-open');
  postEditForm.classList.remove('hidden');

  form.addEventListener('submit', onFormSubmit);
  hashtagsInput.addEventListener('keydown', cancelDocumentKeyDown);
  descriptionInput.addEventListener('keydown', cancelDocumentKeyDown);
};

photoInputBtn.addEventListener('input', onPhotoInput);
formCancel.addEventListener('click', onFormCancel);
