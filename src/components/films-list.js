import {createElement} from './utils.js';

const createFilmsListTemplate = (list) => {
  const {title, isExtra} = list;

  const type = isExtra ? `--extra` : ``;
  const visuallyHidden = !isExtra ? `visually-hidden` : ``;

  return (
    `<section class="films-list${type}">
      <h2 class="films-list__title ${visuallyHidden}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList {
  constructor(list) {
    this._list = list;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._list);
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
  createFilmsListTemplate,
};
