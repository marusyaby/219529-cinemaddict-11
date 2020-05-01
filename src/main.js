import PageController from './controllers/page.js';
import FilmsComponent from './components/films.js';
import FooterStatComponent from './components/footer-stat.js';
import ProfileComponent from './components/profile.js';
import {getRandomFilms} from './mock/random-film.js';
import {render} from './utils/render.js';
import {FilmsCount} from './utils/const.js';

const films = getRandomFilms(FilmsCount.TOTAL);
const watchedFilmsCount = films.filter((film) => film.isWatched).length;

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent);

render(siteHeader, new ProfileComponent(watchedFilmsCount));
render(siteFooter, new FooterStatComponent(films.length));
render(siteMain, filmsComponent);
pageController.render(films);


