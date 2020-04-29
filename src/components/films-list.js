import AbstractComponent from './abstract.js';

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

export default class FilmsList extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }

  getTemplate() {
    return createFilmsListTemplate(this._list);
  }
}
