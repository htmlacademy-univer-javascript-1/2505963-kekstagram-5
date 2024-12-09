import {loadPhotosData} from './api.js';
import {renderPics} from './pics-render.js';
import './big-pic-popup.js';
import './input-form.js';

let photosData = [];

const onSuccess = (data) => {
  photosData = data.slice();
  renderPics(photosData);
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

export {photosData, onFail};
