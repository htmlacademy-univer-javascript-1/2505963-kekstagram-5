import {photosData} from './main.js';
import {picturesContainer} from './pics-render.js';
import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;
const COMMENT_AVATAR_SIZE = 35;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();

let currentPictureCommentsCount = COMMENTS_STEP;
let currentComments = [];

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onBigPictureClose();
  }
};

function onBigPictureClose () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  currentPictureCommentsCount = COMMENTS_STEP;
}

const createCommentElement = (comment) => {
  const {avatar, name, message} = comment;

  const newComment = document.createElement('li');
  const newCommentAvatar = document.createElement('img');
  const newCommentText = document.createElement('p');

  newComment.classList.add('social__comment');
  newCommentAvatar.classList.add('social__picture');
  newCommentText.classList.add('social__text');

  newCommentAvatar.src = avatar;
  newCommentAvatar.alt = name;
  newCommentAvatar.width = COMMENT_AVATAR_SIZE;
  newCommentAvatar.height = COMMENT_AVATAR_SIZE;
  newCommentText.textContent = message;

  newComment.appendChild(newCommentAvatar);
  newComment.appendChild(newCommentText);

  commentFragment.appendChild(newComment);
};

const renderComments = () => {
  bigPictureComments.innerHTML = '';
  commentCount.innerHTML = '';

  currentPictureCommentsCount = (currentPictureCommentsCount > currentComments.length) ? currentComments.length : currentPictureCommentsCount;
  const commentsSelected = currentComments.slice(0, currentPictureCommentsCount);

  if (currentComments.length <= COMMENTS_STEP || currentPictureCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCount.innerHTML = `${currentPictureCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  for (let i = 0; i < commentsSelected.length; i++) {
    createCommentElement(commentsSelected[i]);
  }

  bigPictureComments.appendChild(commentFragment);
};

const onLoadComments = () => {
  currentPictureCommentsCount += COMMENTS_STEP;
  renderComments();
};

const getPicData = (smallPicture) => {
  for (let i = 0; i < photosData.length; i++) {
    if (smallPicture.src.toString().indexOf(photosData[i].url) !== -1) {
      return photosData[i];
    }
  }
};

const renderBigPicture = (picture) => {
  const {url, likes, comments, description} = picture;
  currentComments = comments.slice();

  bigPictureImage.src = url;
  bigPictureLikesCount.textContent = likes;
  renderComments();
  bigPictureDescription.textContent = description;
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    renderBigPicture(getPicData(evt.target));

    document.addEventListener('keydown', onDocumentKeyDown);
    commentsLoader.addEventListener('click', onLoadComments);
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureClose.addEventListener('click', onBigPictureClose);
