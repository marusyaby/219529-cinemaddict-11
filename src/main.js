import CommentsComponent from './components/comments.js';
import NoFilmsComponent from './components/no-films.js';
import FilmCardComponent from './components/film-card.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsComponent from './components/films.js';
import FilmsListComponent from './components/films-list.js';
import FooterStatComponent from './components/footer-stat.js';
import NavigationComponent from './components/navigation.js';
import ProfileComponent from './components/profile.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import SortComponent from './components/sort.js';

import {getRandomFilms} from './mock/random-film.js';
import {getFilmsByKey} from './utils/common.js';
import {FilmsSection} from './components/const.js';
import {render, remove} from './utils/render';

const FilmsCount = {
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

    const closeButton = filmDetailsComponent.getElement()
    .querySelector(`.film-details__close-btn`);
    const detailsBottomContainer = filmDetailsComponent.getElement()
    .querySelector(`.form-details__bottom-container`);
    closeButton.addEventListener(`click`, closeFilmDetails);

    render(document.body, filmDetailsComponent);
    render(detailsBottomContainer, commentsComponent);

    closeButton.addEventListener(`click`, closeFilmDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const commentsComponent = new CommentsComponent(film.comments);

  const filmCardComponent = new FilmCardComponent(film);
  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const onFilmCardPosterClick = () => openFilmDetails();
  const onFilmCardTitleClick = () => openFilmDetails();
  const onFilmCardCommentsClick = () => openFilmDetails();

  filmCardPoster.addEventListener(`click`, onFilmCardPosterClick);
  filmCardTitle.addEventListener(`click`, onFilmCardTitleClick);
  filmCardComments.addEventListener(`click`, onFilmCardCommentsClick);

  render(filmList, filmCardComponent);
};

const renderFilmsList = (filmsComponent, filmsList, films) => {
  const filmsListComponent = new FilmsListComponent(filmsList);
  render(filmsComponent.getElement(), filmsListComponent);

  const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  let renderedFilmsCount = FilmsCount.ON_START;

  const renderFilms = (from, to) => {
    films.slice(from, to).forEach((film) =>
      renderFilmCard(filmsContainer, film));
  };

  const onShowMoreButtonClick = () => {
    const prevFilmsCount = renderedFilmsCount;
    renderedFilmsCount += FilmsCount.BY_BUTTON;
    renderFilms(prevFilmsCount, renderedFilmsCount);

    if (renderedFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  };

  renderFilms(0, renderedFilmsCount);

  if (films.length > FilmsCount.ON_START) {
    render(filmsListComponent.getElement(), showMoreButtonComponent);
  }

  showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonClick);
};

const renderFilmsListExtra = (filmsComponent, filmsList, films) => {
  const filmsListComponent = new FilmsListComponent(filmsList);
  render(filmsComponent.getElement(), filmsListComponent);

  const filmsContainer = filmsListComponent.getElement().
    querySelector(`.films-list__container`);

  films.forEach((film) =>
    renderFilmCard(filmsContainer, film));
};

const films = getRandomFilms(FilmsCount.TOTAL);
const watchedFilmsCount = films.filter((film) => film.isWatched).length;

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new ProfileComponent(watchedFilmsCount));
render(siteMain, new NavigationComponent(films));
render(siteMain, new SortComponent());
render(siteFooter, new FooterStatComponent(films.length));

const filmsComponent = new FilmsComponent();
render(siteMain, filmsComponent);

const renderAllFilmsLists = () => {
  if (films.length === 0) {
    render(filmsComponent.getElement(), new NoFilmsComponent());
    return;
  }

  renderFilmsList(filmsComponent, FilmsSection.All, films);

  const topRatedFilms = getFilmsByKey(films, FilmsSection.TopRated.keyToSort, FilmsCount.EXTRA);
  const mostCommentedFilms = getFilmsByKey(films, FilmsSection.MostCommented.keyToSort, FilmsCount.EXTRA);

  renderFilmsListExtra(filmsComponent, FilmsSection.TopRated, topRatedFilms);
  renderFilmsListExtra(filmsComponent, FilmsSection.MostCommented, mostCommentedFilms);
};

renderAllFilmsLists();

