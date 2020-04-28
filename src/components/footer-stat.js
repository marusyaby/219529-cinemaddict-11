import AbstractComponent from './abstract.js';

const createFooterStatTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount} movies inside</p>`
  );
};

export default class FooterStat extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatTemplate(this._filmsCount);
  }
}
