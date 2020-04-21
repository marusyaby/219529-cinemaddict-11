import {
  formatDuration,
  formatDescription,
} from './utils.js';

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    description,
    rating,
    release,
    duration,
    genres,
    comments,
    isInList,
    isWatched,
    isFavourite,
  } = film;

  const year = release.getFullYear();
  const formattedDuration = formatDuration(duration);
  const formattedDescription = formatDescription(description);

  const activateControl = (isActive) => {
    return isActive ? `film-card__controls-item--active` : ``;
  };

  const formatComments = () => {
    return comments.length === 1 ? `1 comment` : comments.length + ` comments`;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title} Poster" class="film-card__poster">
      <p class="film-card__description">${formattedDescription}</p>
      <a class="film-card__comments">${formatComments()}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
${activateControl(isInList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
${activateControl(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite
${activateControl(isFavourite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {
  createFilmCardTemplate,
};