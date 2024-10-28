import {photosData} from './data.js';

const photos = photosData;
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picsContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const photoElement = picTemplate.cloneNode(true);

  photoElement.querySelector('img').src = url;
  photoElement.querySelector('img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  fragment.appendChild(photoElement);
});

picsContainer.appendChild(fragment);
