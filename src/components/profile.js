import {USER_TITLES} from './const.js';
import {createElement} from './utils.js';

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

export default class Profile {
  constructor(filmsWatchedCount) {
    this._filmsWatchedCount = filmsWatchedCount;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsWatchedCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {
  createProfileTemplate,
};
