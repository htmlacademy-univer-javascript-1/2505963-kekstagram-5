const URLS = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram'
};

const ERROR_MESSAGES = {
  GET: 'Ошибка загрузки изображений. Попробуйте перезагрузить страницу',
  POST: 'Ошибка отправки данных. Попробуйте ещё раз'
};

const sendRequest = (onSuccess, onFail, method, errorMessage, body) => {
  fetch(
    URLS[method],
    {
      method: method,
      body: body
    }
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(errorMessage);
    });
};

const loadPhotosData = (onSuccess, onFail) => {
  sendRequest(onSuccess, onFail, 'GET', ERROR_MESSAGES.GET);
};
const uploadPhotosData = (onSuccess, onFail, body) => {
  sendRequest(onSuccess, onFail, 'POST', ERROR_MESSAGES.POST, body);
};

export {loadPhotosData, uploadPhotosData};
