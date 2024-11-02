import {photosData} from './data.js';

const photos = photosData;
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picsContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const photoElement = picTemplate.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  fragment.appendChild(photoElement);
});

picsContainer.appendChild(fragment);

export {picsContainer};
