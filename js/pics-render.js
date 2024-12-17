const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderPictures = (photosData) => {
  if (picturesContainer.children.length > 2) {
    while (picturesContainer.children.length > 2) {
      const photo = picturesContainer.lastChild;
      photo.parentNode.removeChild(photo);
    }
  }

  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
};

export {renderPictures, picturesContainer};
