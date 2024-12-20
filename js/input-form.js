import {isEscapeKey} from './util.js';
import {pristine} from './form-validation.js';
import {
  DEFAULT_SCALE,
  onPictureSmallerButtonClick,
  onPictureBiggerButtonClick
} from './input-picture-scale.js';
import {onEffectsListClick} from './input-picture-effects.js';
import {uploadPhotosData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const UploadBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const photoInputButton = form.querySelector('.img-upload__input');
const formCancel = form.querySelector('.img-upload__cancel');
const postEditForm = form.querySelector('.img-upload__overlay');
const hashtagsInput = postEditForm.querySelector('.text__hashtags');
const descriptionInput = postEditForm.querySelector('.text__description');
const pictureSmallerButton = document.querySelector('.scale__control--smaller');
const pictureBiggerButton = document.querySelector('.scale__control--bigger');
const pictureScale = document.querySelector('.scale__control--value');
const picturePreviewWrapper = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const uploadButton = document.querySelector('.img-upload__submit');
const successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successBlock.querySelector('.success__button');
const errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = successBlock.querySelector('.error__button');

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

const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = UploadBtnText.SENDING;
};

const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = UploadBtnText.IDLE;
};

const onSuccessUpload = () => {
  unblockUploadButton();
  onFormCancel();

  successBlock.classList.remove('hidden');
  successBlock.addEventListener('click', onClickOutsideSuccessBlock);
  document.addEventListener('keydown', onSuccessBlockKeyDown);
  successButton.addEventListener('click', onSuccessBlockCancel);
};

const onFailUpload = () => {
  unblockUploadButton();

  errorBlock.classList.remove('hidden');
  errorBlock.addEventListener('click', onClickOutsideErrorBlock);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onErrorBlockKeyDown);
  errorButton.addEventListener('click', onErrorBlockCancel);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockUploadButton();
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

  pictureScale['value'] = `${DEFAULT_SCALE}%`;
  picturePreviewWrapper.style.transform = `scale(${DEFAULT_SCALE.toString()[0]})`;
  pictureSmallerButton.removeEventListener('click', onPictureSmallerButtonClick);
  pictureBiggerButton.removeEventListener('click', onPictureBiggerButtonClick);

  effectLevelValue['value'] = '';
  picturePreviewWrapper.style.filter = '';
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
  const file = photoInputButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    const preview = picturePreviewWrapper.querySelector('img');
    preview.src = URL.createObjectURL(file);
  }

  document.addEventListener('keydown', onDocumentKeyDown);
  body.classList.add('modal-open');
  postEditForm.classList.remove('hidden');

  form.addEventListener('submit', onFormSubmit);
  hashtagsInput.addEventListener('keydown', cancelDocumentKeyDown);
  descriptionInput.addEventListener('keydown', cancelDocumentKeyDown);

  pictureSmallerButton.addEventListener('click', onPictureSmallerButtonClick);
  pictureBiggerButton.addEventListener('click', onPictureBiggerButtonClick);

  sliderContainer.classList.add('hidden');
  effectsList.addEventListener('click', onEffectsListClick);
};

photoInputButton.addEventListener('change', onPhotoInput);
formCancel.addEventListener('click', onFormCancel);
