import {SORT_NAMES} from './const.js';
import AbstractComponent from './abstract.js';

const createSortMarkup = (sortNames) => {
  return sortNames.map((sortName, index) => {
    const classActive = index === 0 ? `sort__button--active` : ``;

    return (
      `<li><a href="#" class="sort__button ${classActive}">Sort by ${sortName}</a></li>`
    );
  }).join(`\n`);
};

const createSortTemplate = () => {
  const sortMarkup = createSortMarkup(SORT_NAMES);

  return (
    `<ul class="sort">
        ${sortMarkup}
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
