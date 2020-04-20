import {createProfileTemplate} from './components/profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {
  createFilmsTemplate,
  createFilmsTopTemplate,
  createFilmsMostCommentedTemplate,
} from './components/films.js';
import {getRandomFilms} from './mock/random-film';

import {createFilmCardTemplate} from './components/film-card.js';
import {createButtonTemlate} from './components/button.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFooterStatTemplate} from './components/footer-stat.js';
import {createCommentsTemplate} from './components/comments.js';

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const render = (container, template, place = `beforeend`) =>
  container.insertAdjacentHTML(place, template);

const repeat = (count, action) =>
  Array(count).fill(``).forEach(action);

const siteHeader = document.querySelector(`.header`);
render(siteHeader, createProfileTemplate());

const siteMain = document.querySelector(`.main`);
render(siteMain, createNavigationTemplate());
render(siteMain, createSortTemplate());
render(siteMain, createFilmsTemplate());

const filmsSection = document.querySelector(`.films`);
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);

const films = getRandomFilms(FILMS_COUNT);
console.log(films);

films.forEach((film) => {
  render(filmsContainer, createFilmCardTemplate(film));
});

render(filmsSection, createFilmsTopTemplate());
render(filmsSection, createFilmsMostCommentedTemplate());
const filmsExtraContainers = filmsSection.querySelectorAll(`.films-list--extra .films-list__container`);
filmsExtraContainers.forEach((filmsExtraContainer) => {
  repeat(FILMS_EXTRA_COUNT, () =>
    render(filmsExtraContainer, createFilmCardTemplate(films[0])));
});

render(filmsList, createButtonTemlate());

const siteFooter = document.querySelector(`.footer`);
render(siteFooter, createFooterStatTemplate(films.length));
render(siteFooter, createFilmDetailsTemplate(films[0]), `afterend`);

const detailsBottomContainer = document.querySelector(`.form-details__bottom-container`);
const comments = films[0].comments;
render(detailsBottomContainer, createCommentsTemplate(comments));
