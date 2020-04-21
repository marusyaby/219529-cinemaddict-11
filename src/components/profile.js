import {USER_TITLES} from './const.js';

const getUserTitle = (filmsWatched) => {
  let userTitle = ``;

  for (const title of USER_TITLES) {
    if (filmsWatched >= title.FILMS_MIN && filmsWatched <= title.FILMS_MAX) {
      userTitle = title.NAME;
      break;
    }
  }

  return userTitle;
};

const createProfileTemplate = (filmsWatched) => {
  const userTitle = getUserTitle(filmsWatched);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {
  createProfileTemplate,
};
