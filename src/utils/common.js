import {DESCRIPTION_LENGTH_MAX} from './const.js';

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
  let filmsByKey = [];

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

const filterFilms = (films) => {
  return ([
    {
      name: `All movies`,
      results: films,
    },
    {
      name: `Watchlist`,
      results: films.filter((film) =>
        film.isInList),
    },
    {
      name: `History`,
      results: films.filter((film) =>
        film.isWatched),
    },
    {
      name: `Favorites`,
      results: films.filter((film) =>
        film.isFavourite),
    },
  ]);
};

export {
  formatDuration,
  formatDescription,
  formatReleaseDate,
  formatCommentDate,
  getFilmsByKey,
  filterFilms,
};
