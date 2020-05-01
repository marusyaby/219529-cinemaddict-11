import AbstractComponent from './abstract.js';
import {USER_TITLES} from '../utils/const.js';

const getUserTitle = (filmsWatchedCount) => {
  let userTitle = ``;

  for (const title of USER_TITLES) {
    if (filmsWatchedCount >= title.FILMS_MIN && filmsWatchedCount <= title.FILMS_MAX) {
      userTitle = title.NAME;
      break;
    }
  }

  return userTitle;
};

const createProfileTemplate = (filmsWatchedCount) => {
  const userTitle = getUserTitle(filmsWatchedCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(filmsWatchedCount) {
    super();
    this._filmsWatchedCount = filmsWatchedCount;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsWatchedCount);
  }
}
