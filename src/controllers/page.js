import FilmsListComponent from '../components/films-list.js';
import NavigationComponent from '../components/navigation.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import SortComponent from '../components/sort.js';

import {remove, render, RenderPosition} from '../utils/render.js';
import {getFilmsByKey} from '../utils/common.js';

import {DEFAULT_SORT_TYPE, FilmsSection, FilmsCount} from '../utils/const.js';
import FilmController from './film.js';

const getSortedFilms = (films, sortType) => {
  if (sortType === DEFAULT_SORT_TYPE) {
    return films.slice();
  }

  return getFilmsByKey(films, sortType, films.length);
};

const renderFilms = (filmsContainer, filmsToRender) => {
  filmsToRender.forEach((film) => {
    const filmController = new FilmController(filmsContainer);
    filmController.render(film);
  });
};

export default class Page {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._renderedFilmsCount = FilmsCount.ON_START;

    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._navigationComponent = null;
    this._filmsListComponent = null;
    this._filmsListExtraComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  render(films) {
    this._films = films;
    this._navigationComponent = new NavigationComponent(films);

    const container = this._container.getElement();
    const topRatedFilms = getFilmsByKey(this._films, FilmsSection.TOP_RATED.keyToSort, FilmsCount.EXTRA);
    const mostCommentedFilms = getFilmsByKey(this._films, FilmsSection.MOST_COMMENTED.keyToSort, FilmsCount.EXTRA);

    render(container, this._navigationComponent, RenderPosition.BEFOREBEGIN);
    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    if (!films.length) {
      render(container, this._noFilmsComponent);
      return;
    }

    this._renderFilmsList(FilmsSection.ALL, this._films);
    this._renderFilmsListExtra(FilmsSection.TOP_RATED, topRatedFilms);
    this._renderFilmsListExtra(FilmsSection.MOST_COMMENTED, mostCommentedFilms);
  }

  _renderFilmsList(filmsList) {
    this._filmsListComponent = new FilmsListComponent(filmsList);
    const container = this._container.getElement();
    const filmsContainer = this._filmsListComponent.getElement()
    .querySelector(`.films-list__container`);

    render(container, this._filmsListComponent);
    renderFilms(filmsContainer, this._films.slice(0, this._renderedFilmsCount));
    this._renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderFilmsListExtra(filmsList, filmsExtra) {
    if (!filmsExtra.length) {
      return;
    }

    this._filmsListExtraComponent = new FilmsListComponent(filmsList);
    const container = this._container.getElement();
    const filmsContainer = this._filmsListExtraComponent.getElement()
    .querySelector(`.films-list__container`);

    render(container, this._filmsListExtraComponent);
    renderFilms(filmsContainer, filmsExtra);
  }

  _renderShowMoreButton() {
    if (this._films.length <= FilmsCount.ON_START) {
      return;
    }

    const onShowMoreButtonClick = () => {
      const prevFilmsCount = this._renderedFilmsCount;
      const filmsContainer = this._filmsListComponent.getElement()
      .querySelector(`.films-list__container`);

      let sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType());
      if (!sortedFilms.length) {
        sortedFilms = this._films;
      }

      this._renderedFilmsCount += FilmsCount.BY_BUTTON;
      renderFilms(filmsContainer, sortedFilms.slice(prevFilmsCount, this._renderedFilmsCount));

      if (this._renderedFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    remove(this._showMoreButtonComponent);
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
  }

  _onSortTypeChange(sortType) {
    this._renderedFilmsCount = FilmsCount.ON_START;
    const filmsContainer = this._filmsListComponent.getElement()
      .querySelector(`.films-list__container`);

    filmsContainer.innerHTML = ``;

    let sortedFilms = getSortedFilms(this._films, sortType);
    if (!sortedFilms.length) {
      sortedFilms = this._films;
    }

    renderFilms(filmsContainer, sortedFilms.slice(0, this._renderedFilmsCount));
    this._renderShowMoreButton();
  }
}
