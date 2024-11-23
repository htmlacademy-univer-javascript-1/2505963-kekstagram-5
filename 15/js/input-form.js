import {isEscapeKey} from './util.js';
import {pristine} from './form-validation.js';
import {
  DEFAULT_SCALE,
  onPicSmallerBtnClick,
  onPicBiggerBtnClick
} from './input-pic_scale.js';
import {onEffectsListClick} from './input-pic_effects.js';

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

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
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

  picScale['value'] = DEFAULT_SCALE;
  picPreview.style.transform = `scale(${DEFAULT_SCALE.toString()[0]})`;
  picSmallerBtn.removeEventListener('click', onPicSmallerBtnClick);
  picBiggerBtn.removeEventListener('click', onPicBiggerBtnClick);

  effectLevelValue['value'] = '';
  picPreview.style.filter = '';
  effectsList.removeEventListener('click', onEffectsListClick);
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
