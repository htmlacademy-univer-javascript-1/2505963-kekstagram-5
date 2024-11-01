import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement
} from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Ты сыт? Потому что ты только что поел!',
  'Я люблю это больше, чем пиццу, и это говорит о многом',
  'Ты - лучшая вещь после нарезанного хлеба',
  'Я не знал, что вы модель'
];
const DESCRIPTIONS = [
  'Сегодня лучший день!',
  'Впереди только лучшие воспоминания!',
  'Поймал момент',
  'Настоящие приключения начинаются здесь',
  'Суббота в разгаре',
  'Солнце, улыбка и немного магии)',
  'Сделай это ради воспоминаний',
  'В погоне за закатами и мечтами',
  'Уровень уверенности: селфи без фильтра'
];

const PHOTOS_NEEDED = 25;

const CommentsID = {
  MIN: 1,
  MAX: 1000
};
const PhotosID = {
  MIN: 1,
  MAX: 25
};
const UrlNumber = {
  MIN: 1,
  MAX: 25
};
const AvatarID = {
  MIN: 1,
  MAX: 6
};
const LikesAmount = {
  MIN: 15,
  MAX: 200
};
const CommentsAmount = {
  MIN: 0,
  MAX: 30
};


const generateCommentsId = createRandomIdFromRangeGenerator(CommentsID.MIN, CommentsID.MAX);
const generatePhotosId = createRandomIdFromRangeGenerator(PhotosID.MIN, PhotosID.MAX);
const generateUrlNumber = createRandomIdFromRangeGenerator(UrlNumber.MIN, UrlNumber.MAX);


const generateCommentsData = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${ getRandomInteger(AvatarID.MIN, AvatarID.MAX) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generatePhotosData = () => ({
  id: generatePhotosId(),
  url: `photos/${ generateUrlNumber() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LikesAmount.MIN, LikesAmount.MAX),
  comments: Array.from({length: getRandomInteger(CommentsAmount.MIN, CommentsAmount.MAX)}, generateCommentsData),
});

const photosData = Array.from({length: PHOTOS_NEEDED}, generatePhotosData);

export {photosData};
