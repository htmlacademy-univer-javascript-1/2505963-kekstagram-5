import {renderPictures} from './pictures-render.js';
import {getRandomArrayElement} from './util.js';

const RANDOM_FILTER_PICTURES_COUNT = 10;

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const comparePicturesByCommentsCount = (pictureA, pictureB) => {
  const pictureACommentsCount = pictureA.comments.length;
  const pictureBCommentsCount = pictureB.comments.length;

  return pictureBCommentsCount - pictureACommentsCount;
};

const onDefaultFilterClick = (photosData) => {
  defaultFilter.classList.add('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');

  renderPictures(photosData);
};

const onRandomFilterClick = (photosData) => {
  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.add('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');

  photosData = photosData.slice();
  const randomPhotos = [];
  for (let i = 0; i < RANDOM_FILTER_PICTURES_COUNT; i++) {
    const photo = getRandomArrayElement(photosData);
    randomPhotos.push(photo);
    photosData.splice(photosData.indexOf(photo), 1);
  }
  renderPictures(randomPhotos);
};

const onDiscussedFilterClick = (photosData) => {
  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.add('img-filters__button--active');

  renderPictures(
    photosData
      .slice()
      .sort(comparePicturesByCommentsCount)
  );
};

export {
  onDefaultFilterClick,
  onRandomFilterClick,
  onDiscussedFilterClick
};
