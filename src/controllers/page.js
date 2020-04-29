import FilmsListComponent from '../components/films-list.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmDetailsComponent from '../components/film-details.js';
import CommentsComponent from '../components/comments.js';
import FilmCardComponent from '../components/film-card.js';
import NoFilmsComponent from '../components/no-films.js';

import {remove, render} from '../utils/render.js';
import {getFilmsByKey} from '../utils/common.js';

import {FilmsSection} from '../components/const.js';

export const FilmsCount = {
  TOTAL: 15,
  ON_START: 5,
  BY_BUTTON: 5,
  EXTRA: 2
};

const renderFilmCard = (filmList, film) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const closeFilmDetails = () => {
    remove(filmDetailsComponent);
    remove(commentsComponent);

    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const openFilmDetails = () => {
    if (document.body.querySelector(`.film-details`)) {
      document.body.querySelector(`.film-details`).remove();
    }

    const detailsBottomContainer = filmDetailsComponent.getElement()
    .querySelector(`.form-details__bottom-container`);

    render(document.body, filmDetailsComponent);
    render(detailsBottomContainer, commentsComponent);

    filmDetailsComponent.setCloseButtonClickHandler(closeFilmDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const commentsComponent = new CommentsComponent(film.comments);

  const filmCardComponent = new FilmCardComponent(film);

  filmCardComponent.setPosterClickHandler(openFilmDetails);
  filmCardComponent.setTitleClickHandler(openFilmDetails);
  filmCardComponent.setCommentsClickHandler(openFilmDetails);

  render(filmList, filmCardComponent);
};

export default class Page {
  constructor(container) {
    this._container = container;
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    const renderFilmsList = (filmsList, filmsAll) => {
      const filmsListComponent = new FilmsListComponent(filmsList);
      render(container, filmsListComponent);

      const filmsContainer = filmsListComponent.getElement()
        .querySelector(`.films-list__container`);

      let renderedFilmsCount = FilmsCount.ON_START;

      const renderFilms = (from, to) => {
        filmsAll.slice(from, to).forEach((film) =>
          renderFilmCard(filmsContainer, film));
      };

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = renderedFilmsCount;
        renderedFilmsCount += FilmsCount.BY_BUTTON;
        renderFilms(prevFilmsCount, renderedFilmsCount);

        if (renderedFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      renderFilms(0, renderedFilmsCount);

      if (films.length > FilmsCount.ON_START) {
        render(filmsListComponent.getElement(), this._showMoreButtonComponent);
      }

      this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
    };

    const renderFilmsListExtra = (filmsList, filmsExtra) => {
      const filmsListComponent = new FilmsListComponent(filmsList);
      render(container, filmsListComponent);

      const filmsContainer = filmsListComponent.getElement()
        .querySelector(`.films-list__container`);

      filmsExtra.forEach((film) =>
        renderFilmCard(filmsContainer, film));
    };

    if (films.length === 0) {
      render(container, this._noFilmsComponent);
      return;
    }

    renderFilmsList(FilmsSection.All, films);

    const topRatedFilms = getFilmsByKey(films, FilmsSection.TopRated.keyToSort, FilmsCount.EXTRA);
    const mostCommentedFilms = getFilmsByKey(films, FilmsSection.MostCommented.keyToSort, FilmsCount.EXTRA);

    renderFilmsListExtra(FilmsSection.TopRated, topRatedFilms);
    renderFilmsListExtra(FilmsSection.MostCommented, mostCommentedFilms);
  }
}
