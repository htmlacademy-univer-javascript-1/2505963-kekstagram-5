const FormErrors = {
  DESCRIPTION_ERROR: 'Описание до 140 символов',
  HASHTAGS_COUNT_EXCEEDED: 'Превышено количество хэш-тегов',
  HASHTAGS_REPEATING: 'Хэш-теги повторяются',
  INVALID_HASHTAG: 'Введён невалидный хэш-тег'
};

const HASHTAG_MASK = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const postEditForm = form.querySelector('.img-upload__overlay');
const hashtagsInput = postEditForm.querySelector('.text__hashtags');
const descriptionInput = postEditForm.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

function validateDescription (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}
pristine.addValidator(descriptionInput, validateDescription, FormErrors.DESCRIPTION_ERROR);

function validateHashtagsCount (value) {
  return value.trim().split(/\s+/).length <= MAX_HASHTAGS_AMOUNT;
}
pristine.addValidator(hashtagsInput, validateHashtagsCount, FormErrors.HASHTAGS_COUNT_EXCEEDED);

function validateHashtagRepeating (value) {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const set = new Set();

  for (let i = 0; i < hashtags.length; i++) {
    set.add(hashtags[i]);
  }

  return hashtags.length === set.size;
}
pristine.addValidator(hashtagsInput, validateHashtagRepeating, FormErrors.HASHTAGS_REPEATING);

function validateHashtags (value) {
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }

  const hashtags = inputText.split(/\s+/);
  for (let i = 0; i < hashtags.length; i++) {
    if (HASHTAG_MASK.test(hashtags[i]) === false) {
      return false;
    }
  }
  return true;
}
pristine.addValidator(hashtagsInput, validateHashtags, FormErrors.INVALID_HASHTAG);

export {pristine};
