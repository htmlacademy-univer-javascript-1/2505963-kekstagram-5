import {isEscapeKey} from './util.js';
import {photosData} from './data.js';
import {picsContainer} from './pics_render.js';

const body = document.querySelector('body');

const bigPicturePopup = document.querySelector('.big-picture');
const bigPicturePopupCloseElement = bigPicturePopup.querySelector('.big-picture__cancel');

const popupPicture = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
const popupLikesCount = bigPicturePopup.querySelector('.likes-count');
const popupCommentsCount = bigPicturePopup.querySelector('.comments-count');
const popupComments = bigPicturePopup.querySelector('.social__comments');
const popupCaption = bigPicturePopup.querySelector('.social__caption');

const commentCount = bigPicturePopup.querySelector('.social__comment-count');
const commentsLoader = bigPicturePopup.querySelector('.comments-loader');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onPopupClose(evt);
  }
};

function onPopupClose (evt) {
  evt.preventDefault();
  bigPicturePopup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const getSmallPhotoData = function (smallPic, photos) {
  for (let i = 0; i < photos.length; i++) {
    if (smallPic.src.toString().indexOf(photos[i]['url']) !== -1) {
      return photos[i];
    }
  }
};

const createCommentElements = function (smallPic, photos) {
  const fragment = document.createDocumentFragment();
  const comments = getSmallPhotoData(smallPic, photos).comments;

  for (let i = 0; i < comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const newCommentAvatar = document.createElement('img');
    newCommentAvatar.classList.add('social__picture');
    newCommentAvatar.src = comments[i].avatar;
    newCommentAvatar.alt = comments[i].name;
    newCommentAvatar.width = 35;
    newCommentAvatar.height = 35;

    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = comments[i].message;

    newComment.appendChild(newCommentAvatar);
    newComment.appendChild(newCommentText);

    fragment.appendChild(newComment);
  }

  return fragment;
};

const onPicsContainerClick = function (evt) {
  if (evt.target.matches('.picture__img')) {
    bigPicturePopup.classList.remove('hidden');
    const smallPic = evt.target;

    popupPicture.src = smallPic.src;
    popupLikesCount.textContent = smallPic.closest('.picture').querySelector('.picture__likes').textContent;
    popupCommentsCount.textContent = smallPic.closest('.picture').querySelector('.picture__comments').textContent;
    popupCaption.textContent = getSmallPhotoData(smallPic, photosData).description;

    popupComments.innerHTML = '';
    popupComments.append(createCommentElements(smallPic, photosData));
    let hiddenComments = 0;
    for (let i = 5; i < popupComments.children.length; i++) {
      popupComments.children[i].classList.add('hidden');
      hiddenComments++;
    }
    commentCount.childNodes[0].textContent = `${popupComments.children.length - hiddenComments} из `;

    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeyDown);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

const getHiddenCommentsCount = function (comments) {
  let hiddenComments = 0;
  for (let i = 0; i < comments.children.length; i++) {
    if (comments.children[i].classList.contains('hidden')) {
      hiddenComments++;
    }
  }
  return hiddenComments;
};

function onCommentsLoaderClick () {
  const hiddenComments = getHiddenCommentsCount(popupComments);
  for (let i = hiddenComments; i < hiddenComments + 5; i++) {
    if (popupComments.children[i]) {
      popupComments.children[i].classList.remove('hidden');
    }
  }
  const hiddenCommentsAfter = getHiddenCommentsCount(popupComments);
  commentCount.childNodes[0].textContent = `${popupComments.children.length - hiddenCommentsAfter} из `;
}

picsContainer.addEventListener('click', onPicsContainerClick);
bigPicturePopupCloseElement.addEventListener('click', onPopupClose);
