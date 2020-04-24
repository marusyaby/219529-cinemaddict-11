import {createElement} from './utils.js';

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
    }
  ]);
};

const createFiltersMarkup = (films) => {
  const filters = filterFilms(films);

  return filters.map((filter, index) => {
    const {name, results} = filter;

    const activeClass = index === 0 ? `main-navigation__item--active` : ``;
    const count = index === 0 ? `` : `<span class="main-navigation__item-count">${results.length}</span>`;

    return (
      `<a href="#${name}" class="main-navigation__item ${activeClass}">
        ${name}
        ${count}
       </a>`
    );
  }).join(`\n`);
};

const createNavigationTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFiltersMarkup(films)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._films);
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
  createNavigationTemplate,
};
