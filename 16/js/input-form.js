import {isEscapeKey} from './util.js';
import {pristine} from './form-validation.js';
import {
  DEFAULT_SCALE,
  onPicSmallerBtnClick,
  onPicBiggerBtnClick
} from './input-pic-scale.js';
import {onEffectsListClick} from './input-pic-effects.js';
import {uploadPhotosData} from './api.js';

const uploadBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const photoInputBtn = form.querySelector('.img-upload__input');
const formCancel = form.querySelector('.img-upload__cancel');
const postEditForm = form.querySelector('.img-upload__overlay');
const hashtagsInput = postEditForm.querySelector('.text__hashtags');
const descriptionInput = postEditForm.querySelector('.text__description');
const picSmallerBtn = document.querySelector('.scale__control--smaller');
const picBiggerBtn = document.querySelector('.scale__control--bigger');
const picScale = document.querySelector('.scale__control--value');
const picPreview = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const uploadBtn = document.querySelector('.img-upload__submit');
const successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successBtn = successBlock.querySelector('.success__button');
const errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorBtn = successBlock.querySelector('.error__button');

successBlock.classList.add('hidden');
body.appendChild(successBlock);
errorBlock.classList.add('hidden');
body.appendChild(errorBlock);

function cancelDocumentKeyDown (evt) {
  evt.stopPropagation();
}

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onFormCancel();
  }
};

const onSuccessBlockKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onSuccessBlockCancel();
  }
};

const onErrorBlockKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onErrorBlockCancel();
  }
};

const blockUploadBtn = () => {
  uploadBtn.disabled = true;
  uploadBtn.textContent = uploadBtnText.SENDING;
};

const unblockUploadBtn = () => {
  uploadBtn.disabled = false;
  uploadBtn.textContent = uploadBtnText.IDLE;
};

const onSuccessUpload = () => {
  unblockUploadBtn();
  onFormCancel();

  successBlock.classList.remove('hidden');
  successBlock.addEventListener('click', onClickOutsideSuccessBlock);
  document.addEventListener('keydown', onSuccessBlockKeyDown);
  successBtn.addEventListener('click', onSuccessBlockCancel);
};

const onFailUpload = () => {
  unblockUploadBtn();

  errorBlock.classList.remove('hidden');
  errorBlock.addEventListener('click', onClickOutsideErrorBlock);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onErrorBlockKeyDown);
  errorBtn.addEventListener('click', onErrorBlockCancel);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockUploadBtn();
    const requestBody = new FormData(form);
    uploadPhotosData(onSuccessUpload, onFailUpload, requestBody);
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

  picScale['value'] = `${DEFAULT_SCALE}%`;
  picPreview.style.transform = `scale(${DEFAULT_SCALE.toString()[0]})`;
  picSmallerBtn.removeEventListener('click', onPicSmallerBtnClick);
  picBiggerBtn.removeEventListener('click', onPicBiggerBtnClick);

  effectLevelValue['value'] = '';
  picPreview.style.filter = '';
  effectsList.removeEventListener('click', onEffectsListClick);
}

function onSuccessBlockCancel () {
  successBlock.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessBlockKeyDown);
}

function onErrorBlockCancel () {
  errorBlock.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
}

function onClickOutsideSuccessBlock (evt) {
  if (!evt.target.matches('.success__inner')) {
    successBlock.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessBlockKeyDown);
  }
}

function onClickOutsideErrorBlock (evt) {
  if (!evt.target.matches('.error__inner')) {
    errorBlock.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeyDown);
  }
}

const onPhotoInput = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
  body.classList.add('modal-open');
  postEditForm.classList.remove('hidden');

  form.addEventListener('submit', onFormSubmit);
  hashtagsInput.addEventListener('keydown', cancelDocumentKeyDown);
  descriptionInput.addEventListener('keydown', cancelDocumentKeyDown);

  picSmallerBtn.addEventListener('click', onPicSmallerBtnClick);
  picBiggerBtn.addEventListener('click', onPicBiggerBtnClick);

  sliderContainer.classList.add('hidden');
  effectsList.addEventListener('click', onEffectsListClick);
};

photoInputBtn.addEventListener('input', onPhotoInput);
formCancel.addEventListener('click', onFormCancel);
