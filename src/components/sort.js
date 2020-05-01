import AbstractComponent from './abstract.js';
import {SORTS, DEFAULT_SORT_TYPE} from '../utils/const.js';

const SORT_ACTIVE_CLASS = `sort__button--active`;

const createSortMarkup = (sorts) => {
  return sorts.map((sort, index) => {
    const sortName = sort.NAME;
    const sortType = sort.TYPE;
    const classActive = index === 0 ? SORT_ACTIVE_CLASS : ``;

    return (
      `<li><a href="#" data-sort-type="${sortType}" class="sort__button ${classActive}">Sort by ${sortName}</a></li>`
    );
  }).join(`\n`);
};

const createSortTemplate = () => {
  const sortMarkup = createSortMarkup(SORTS);

  return (
    `<ul class="sort">
        ${sortMarkup}
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = DEFAULT_SORT_TYPE;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getElement().querySelector(`.${SORT_ACTIVE_CLASS}`)
        .classList.remove(SORT_ACTIVE_CLASS);
      evt.target.classList.add(SORT_ACTIVE_CLASS);

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
