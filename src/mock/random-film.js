import {
  TITLES,
  POSTERS,
  DESCRIPTION,
  NAMES,
  COUNTRIES,
  AGE,
  RATING,
  RELEASE_DIFF,
  DURATION,
  GENRES,
  EMOTIONS,
} from './random-const.js';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(1);
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomDate = (diffMin, diffMax) => {
  const targetDate = new Date();
  const diffValue = getRandomNumber(diffMin, diffMax);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const getRandomArray = (array) => {
  const shuffleArray = () => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return shuffleArray(array).slice(0, getRandomNumber(1, array.length));
};

const getRandomDescription = (text) => {
  const description = text.split(`\. `);
  return getRandomArray(description).join(`\. `) + `.`;
};

const getRandomBoolean = () => {
  return Math.random() < 0.7;
};

const getRandomComment = () => {
  return {
    author: getRandomArrayItem(NAMES.ACTORS),
    emotion: getRandomArrayItem(EMOTIONS),
    text: getRandomArrayItem(DESCRIPTION.split(`\. `)),
    date: getRandomDate(0, 365),
  };
};

const getRandomComments = (count) => {
  return new Array(count).fill(``).map(getRandomComment);
};

const getRandomFilm = () => {
  const title = getRandomArrayItem(TITLES);
  const comments = getRandomComments(getRandomNumber(0, 5));
  const commentsCount = comments.length;

  return {
    title,
    originalTitle: title,
    director: getRandomArrayItem(NAMES.DIRECTORS),
    writers: getRandomArray(NAMES.WRITERS),
    actors: getRandomArray(NAMES.ACTORS),
    poster: POSTERS[TITLES.indexOf(title)],
    age: getRandomArrayItem(AGE),
    description: getRandomDescription(DESCRIPTION),
    rating: getRandomFloatNumber(RATING.MIN, RATING.MAX),
    release: getRandomDate(RELEASE_DIFF.MIN, RELEASE_DIFF.MAX),
    duration: getRandomNumber(DURATION.MIN, DURATION.MAX),
    genres: getRandomArray(GENRES),
    country: getRandomArrayItem(COUNTRIES),

    isInList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavourite: getRandomBoolean(),

    comments,
    // commentsCount() {
    //   return this.comments.length;
    // },
    commentsCount,
  };
};

const getRandomFilms = (count) => {
  return new Array(count).fill(``).map(getRandomFilm);
};

export {
  getRandomFilms,
};

