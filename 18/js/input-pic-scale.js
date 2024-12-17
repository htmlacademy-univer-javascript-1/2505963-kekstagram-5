const SCALE_CHANGE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const picSmallerBtn = document.querySelector('.scale__control--smaller');
const picBiggerBtn = document.querySelector('.scale__control--bigger');
const picScale = document.querySelector('.scale__control--value');
const picPreview = document.querySelector('.img-upload__preview');

function onPicSmallerBtnClick () {
  let intScale = parseInt(picScale['value'].slice(0, -1), 10);
  if (intScale > MIN_SCALE) {
    intScale -= SCALE_CHANGE_STEP;
  }

  picScale['value'] = `${intScale}%`;
  picPreview.style.transform = `scale(0.${intScale})`;
}

function onPicBiggerBtnClick () {
  let intScale = parseInt(picScale['value'].slice(0, -1), 10);
  if (intScale < MAX_SCALE) {
    intScale += SCALE_CHANGE_STEP;
  }

  picScale['value'] = `${intScale}%`;
  if (intScale === MAX_SCALE) {
    picPreview.style.transform = `scale(${picScale['value'][0]})`;
  } else {
    picPreview.style.transform = `scale(0.${intScale})`;
  }
}

picSmallerBtn.addEventListener('click', onPicSmallerBtnClick);
picBiggerBtn.addEventListener('click', onPicBiggerBtnClick);

export {
  DEFAULT_SCALE,
  picSmallerBtn,
  picBiggerBtn,
  onPicSmallerBtnClick,
  onPicBiggerBtnClick
};
