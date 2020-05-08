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
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    this._navigationComponent = new NavigationComponent(films);

    const container = this._container.getElement();
    const topRatedFilms = getFilmsByKey(films, FilmsSection.TOP_RATED.keyToSort, FilmsCount.EXTRA);
    const mostCommentedFilms = getFilmsByKey(films, FilmsSection.MOST_COMMENTED.keyToSort, FilmsCount.EXTRA);

    const renderFilmsList = (filmsList) => {
      const filmsListComponent = new FilmsListComponent(filmsList);
      const filmsContainer = filmsListComponent.getElement()
      .querySelector(`.films-list__container`);

      let renderedFilmsCount = FilmsCount.ON_START;
      let sortedFilms = getSortedFilms(films, this._sortComponent.getSortType());

      const renderShowMoreButton = () => {
        const onShowMoreButtonClick = () => {
          const prevFilmsCount = renderedFilmsCount;
          renderedFilmsCount += FilmsCount.BY_BUTTON;
          renderFilms(filmsContainer, sortedFilms.slice(prevFilmsCount, renderedFilmsCount));

          if (renderedFilmsCount >= films.length) {
            remove(this._showMoreButtonComponent);
          }
        };

        if (films.length > FilmsCount.ON_START) {
          render(filmsListComponent.getElement(), this._showMoreButtonComponent);
        }

        this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
      };

      const onSortTypeClick = (sortType) => {
        renderedFilmsCount = FilmsCount.ON_START;
        filmsContainer.innerHTML = ``;

        sortedFilms = getSortedFilms(films, sortType);
        renderFilms(filmsContainer, sortedFilms.slice(0, renderedFilmsCount));

        remove(this._showMoreButtonComponent);
        renderShowMoreButton();
      };

      render(container, filmsListComponent);
      renderFilms(filmsContainer, films.slice(0, renderedFilmsCount));
      renderShowMoreButton();

      this._sortComponent.setSortTypeChangeHandler(onSortTypeClick);
    };

    const renderFilmsListExtra = (filmsList, filmsExtra) => {
      if (!filmsExtra.length) {
        return;
      }

      const filmsListComponent = new FilmsListComponent(filmsList);
      render(container, filmsListComponent);

      const filmsContainer = filmsListComponent.getElement()
      .querySelector(`.films-list__container`);

      renderFilms(filmsContainer, filmsExtra);
    };

    render(container.parentElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container.parentElement, this._navigationComponent, RenderPosition.AFTERBEGIN);

    if (!films.length) {
      render(container, this._noFilmsComponent);
      return;
    }

    renderFilmsList(FilmsSection.ALL, films);
    renderFilmsListExtra(FilmsSection.TOP_RATED, topRatedFilms);
    renderFilmsListExtra(FilmsSection.MOST_COMMENTED, mostCommentedFilms);
  }
}
