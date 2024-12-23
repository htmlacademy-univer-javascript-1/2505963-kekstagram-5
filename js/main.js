import {loadPhotosData} from './api.js';
import {renderPictures} from './pictures-render.js';
import './big-picture-popup.js';
import './input-form.js';
import './img-filters.js';
import {
  onDefaultFilterClick,
  onRandomFilterClick,
  onDiscussedFilterClick
} from './img-filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

let photosData = [];

const onSuccess = (data) => {
  photosData = data.slice();
  renderPictures(photosData);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = (errorMessage) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.position = 'absolute';
  alertMessage.style.top = 0;
  alertMessage.style.right = '300px';
  alertMessage.style.left = '300px';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.color = '#ba3939';
  alertMessage.style.backgroundColor = '#ffe0e0';
  alertMessage.style.border = '1px solid #a33a3a';
  alertMessage.style.textAlign = 'center';
  alertMessage.textContent = errorMessage;
  document.body.append(alertMessage);
};

loadPhotosData(onSuccess, onFail);

defaultFilter.addEventListener('click', debounce(() => onDefaultFilterClick(photosData), RERENDER_DELAY));
randomFilter.addEventListener('click', debounce(() => onRandomFilterClick(photosData), RERENDER_DELAY));
discussedFilter.addEventListener('click', debounce(() => onDiscussedFilterClick(photosData), RERENDER_DELAY));

export {photosData, onSuccess, onFail};
