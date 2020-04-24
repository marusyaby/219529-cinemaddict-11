import {DESCRIPTION_LENGTH_MAX} from './const.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const formatDuration = (minutesTotal) => {
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  return hours > 0 ?
    hours + `h ` + minutes + `m` :
    minutes + `m`;
};

const formatDescription = (text) => {
  return text.length > DESCRIPTION_LENGTH_MAX ?
    text.substr(0, DESCRIPTION_LENGTH_MAX - 1) + `...` :
    text;
};

const formatReleaseDate = (date) => {
  return date.toLocaleString(`en-GB`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
  });
};

const formatCommentDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.getHours() + `:` + date.getMinutes();

  return `${year}/${month}/${day} ${time}`;
};

const getFilmsByKey = (filmsArray, key, filmsCount) => {
  let filmsByKey = null;

  const hasKeyValues = (film) =>
    film[key] > 0;

  const sortFilmsByKey = (array) => {
    return array.slice().sort((a, b) => {
      return b[key] - a[key];
    });
  };

  if (filmsArray.some(hasKeyValues)) {
    filmsByKey = sortFilmsByKey(filmsArray).slice(0, filmsCount);
  }

  return filmsByKey;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    // case RenderPosition.AFTERBEGIN:
    //   container.prepend(element);
    //   break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {
  createElement,
  formatDuration,
  formatDescription,
  formatReleaseDate,
  formatCommentDate,
  getFilmsByKey,
  render,
};
