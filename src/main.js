import {createProfileTemplate} from './components/profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsTemplate, createFilmsTopTemplate, createFilmsMostCommentedTemplate} from './components/film-containers.js';
import {getRandomFilms} from './mock/random-film.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createButtonTemlate} from './components/button.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFooterStatTemplate} from './components/footer-stat.js';
import {createCommentsTemplate} from './components/comments.js';
import {getTopRatedFilms, getMostCommentedFilms} from './components/extra-films.js';

const FILMS_COUNT = {
  TOTAL: 15,
  ON_START: 5,
  BY_BUTTON: 5,
};

const EXTRA_FILMS_COUNT = 2;

const films = getRandomFilms(FILMS_COUNT.TOTAL);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) =>
  container.insertAdjacentHTML(place, template);

const createHeader = () => {
  const siteHeader = document.querySelector(`.header`);
  const watchedFilms = films.filter((film) => film.isWatched).length;
  render(siteHeader, createProfileTemplate(watchedFilms));
};

const createNavigation = () => {
  render(siteMain, createNavigationTemplate(films));
  render(siteMain, createSortTemplate());
};

const createFilms = () => {
  render(siteMain, createFilmsTemplate());
  const filmsList = siteMain.querySelector(`.films-list`);
  const filmsContainer = filmsList.querySelector(`.films-list__container`);

  const renderFilms = (from, to) => {
    films.slice(from, to).forEach((film) =>
      render(filmsContainer, createFilmCardTemplate(film)));
  };

  let renderedFilmsCount = FILMS_COUNT.ON_START;
  renderFilms(0, renderedFilmsCount);

  if (films.length > FILMS_COUNT.ON_START) {
    render(filmsList, createButtonTemlate());

    const onLoadMoreButtonClick = () => {
      const prevFilmsCount = renderedFilmsCount;
      renderedFilmsCount += FILMS_COUNT.BY_BUTTON;

      renderFilms(prevFilmsCount, renderedFilmsCount);

      if (renderedFilmsCount >= films.length) {
        loadMoreButton.remove();
      }
    };

    const loadMoreButton = document.querySelector(`.films-list__show-more`);
    loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
  }
};

const createFooter = () => {
  render(siteFooter, createFooterStatTemplate(films.length));
};

const createFilmDetails = () => {
  render(siteFooter, createFilmDetailsTemplate(films[0]), `afterend`);
  const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
  const comments = films[0].comments;
  render(detailsBottomContainer, createCommentsTemplate(comments));
};

const createFilmsExtra = () => {
  const topRatedFilms = getTopRatedFilms(films, EXTRA_FILMS_COUNT);
  const mostCommentedFilms = getMostCommentedFilms(films, EXTRA_FILMS_COUNT);
  const filmsSection = document.querySelector(`.films`);

  if (topRatedFilms) {
    render(filmsSection, createFilmsTopTemplate());
    const filmsTopContainer = filmsSection.querySelector(`.js-films-top`);
    topRatedFilms.forEach((film) => {
      render(filmsTopContainer, createFilmCardTemplate(film));
    });
  }

  if (mostCommentedFilms) {
    render(filmsSection, createFilmsMostCommentedTemplate());
    const filmsMostCommentedContainer = filmsSection.querySelector(`.js-films-most`);
    mostCommentedFilms.forEach((film) =>
      render(filmsMostCommentedContainer, createFilmCardTemplate(film)));
  }
};

createHeader();
createNavigation();
createFilms();
createFooter();
createFilmsExtra();
createFilmDetails();

