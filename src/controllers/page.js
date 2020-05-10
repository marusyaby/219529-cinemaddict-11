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

const renderFilms = (filmsContainer, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsContainer, onDataChange);
    filmController.render(film);
    return filmController;
  });
};

export default class Page {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._renderedFilmControllers = [];
    this._renderedFilmsExtraControllers = [];
    this._renderedFilmsCount = FilmsCount.ON_START;

    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._navigationComponent = null;
    this._filmsListComponent = null;
    this._filmsListExtraComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
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

    const getFilms = () => {
      return this._films.slice(0, this._renderedFilmsCount);
    };

    render(container, this._filmsListComponent);
    this._renderedFilmControllers = renderFilms(filmsContainer, getFilms(), this._onDataChange);

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
    const renderedFilms = renderFilms(filmsContainer, filmsExtra, this._onDataChange);
    this._renderedFilmsExtraControllers = this._renderedFilmsExtraControllers.concat(renderedFilms);
  }

  _renderShowMoreButton() {
    if (this._films.length <= FilmsCount.ON_START) {
      return;
    }

    const onShowMoreButtonClick = () => {
      const prevFilmsCount = this._renderedFilmsCount;
      const filmsContainer = this._filmsListComponent.getElement()
      .querySelector(`.films-list__container`);

      const getFilms = () => {
        let sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType());
        if (!sortedFilms.length) {
          sortedFilms = this._films;
        }
        return sortedFilms.slice(prevFilmsCount, this._renderedFilmsCount);
      };

      this._renderedFilmsCount += FilmsCount.BY_BUTTON;
      const renderedFilms = renderFilms(filmsContainer, getFilms(), this._onDataChange);
      this._renderedFilmControllers = this._renderedFilmControllers.concat(renderedFilms);

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

    const getFilms = () => {
      let sortedFilms = getSortedFilms(this._films, sortType);
      if (!sortedFilms.length) {
        sortedFilms = this._films;
      }
      return sortedFilms.slice(0, this._renderedFilmsCount);
    };

    filmsContainer.innerHTML = ``;

    this._renderedFilmControllers = renderFilms(filmsContainer, getFilms(), this._onDataChange);

    this._renderShowMoreButton();
  }

  _onDataChange(oldData, newData) {
    const changedFilmIndex = this._films.findIndex((it) => it === oldData);

    if (changedFilmIndex === -1) {
      return;
    }

    const allControllers = this._renderedFilmControllers.concat(this._renderedFilmsExtraControllers);
    const filmControllers = allControllers.filter((it) => it._filmId === oldData.id);

    const newFilms = this._films.slice();
    newFilms[changedFilmIndex] = newData;
    this._films = newFilms;

    filmControllers.forEach((controller) => controller.render(this._films[changedFilmIndex]));
  }
}
