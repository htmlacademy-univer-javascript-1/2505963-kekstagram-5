const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picsContainer = document.querySelector('.pictures');

const renderPics = (photosData) => {
  if (picsContainer.children.length > 2) {
    while (picsContainer.children.length > 2) {
      const photo = picsContainer.lastChild;
      photo.parentNode.removeChild(photo);
    }
  }

  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const photoElement = picTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(photoElement);
  });

  picsContainer.appendChild(fragment);
};

export {renderPics, picsContainer};
