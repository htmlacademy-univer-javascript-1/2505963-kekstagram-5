const SCALE_CHANGE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const pictureSmallerButton = document.querySelector('.scale__control--smaller');
const pictureBiggerButton = document.querySelector('.scale__control--bigger');
const pictureScale = document.querySelector('.scale__control--value');
const picturePreviewWrapper = document.querySelector('.img-upload__preview');

function onPictureSmallerButtonClick () {
  let intScale = parseInt(pictureScale['value'].slice(0, -1), 10);
  if (intScale > MIN_SCALE) {
    intScale -= SCALE_CHANGE_STEP;
  }

  pictureScale['value'] = `${intScale}%`;
  picturePreviewWrapper.style.transform = `scale(0.${intScale})`;
}

function onPictureBiggerButtonClick () {
  let intScale = parseInt(pictureScale['value'].slice(0, -1), 10);
  if (intScale < MAX_SCALE) {
    intScale += SCALE_CHANGE_STEP;
  }

  pictureScale['value'] = `${intScale}%`;
  if (intScale === MAX_SCALE) {
    picturePreviewWrapper.style.transform = `scale(${pictureScale['value'][0]})`;
  } else {
    picturePreviewWrapper.style.transform = `scale(0.${intScale})`;
  }
}

pictureSmallerButton.addEventListener('click', onPictureSmallerButtonClick);
pictureBiggerButton.addEventListener('click', onPictureBiggerButtonClick);

export {
  DEFAULT_SCALE,
  pictureSmallerButton,
  pictureBiggerButton,
  onPictureSmallerButtonClick,
  onPictureBiggerButtonClick
};
