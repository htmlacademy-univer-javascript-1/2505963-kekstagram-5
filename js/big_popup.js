import {photosData} from './data.js';
import {picsContainer} from './pics_render.js';
import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

let curPicCommsCount = COMMENTS_STEP;
let curComms = [];

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onBigPictureClose();
  }
};

function onBigPictureClose () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  curPicCommsCount = COMMENTS_STEP;
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
  newCommentAvatar.width = 35;
  newCommentAvatar.height = 35;
  newCommentText.textContent = message;

  newComment.appendChild(newCommentAvatar);
  newComment.appendChild(newCommentText);

  commentFragment.appendChild(newComment);
};

const renderComments = () => {
  bigPictureComments.innerHTML = '';
  commentCount.innerHTML = '';

  curPicCommsCount = (curPicCommsCount > curComms.length) ? curComms.length : curPicCommsCount;
  const commentsSelected = curComms.slice(0, curPicCommsCount);

  if (curComms.length <= COMMENTS_STEP || curPicCommsCount >= curComms.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  commentCount.innerHTML = `${curPicCommsCount} из <span class="comments-count">${curComms.length}</span> комментариев`;

  for (let i = 0; i < commentsSelected.length; i++) {
    createCommentElement(commentsSelected[i]);
  }

  bigPictureComments.appendChild(commentFragment);
};

const onLoadComments = () => {
  curPicCommsCount += COMMENTS_STEP;
  renderComments();
};

const getPicData = (smallPic) => {
  for (let i = 0; i < photosData.length; i++) {
    if (smallPic.src.toString().indexOf(photosData[i].url) !== -1) {
      return photosData[i];
    }
  }
};

const renderBigPicture = (picture) => {
  const {url, likes, comments, description} = picture;
  curComms = comments.slice();

  bigPictureImage.src = url;
  bigPictureLikesCount.textContent = likes;
  renderComments();
  bigPictureDescription.textContent = description;

};

const onPicsContainerClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    renderBigPicture(getPicData(evt.target));

    document.addEventListener('keydown', onDocumentKeyDown);
    loadComments.addEventListener('click', onLoadComments);
  }
};

picsContainer.addEventListener('click', onPicsContainerClick);
bigPictureClose.addEventListener('click', onBigPictureClose);
