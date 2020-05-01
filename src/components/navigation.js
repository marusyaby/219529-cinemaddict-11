import AbstractComponent from './abstract.js';
import {filterFilms} from '../utils/common.js';

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

export default class Navigation extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createNavigationTemplate(this._films);
  }
}
