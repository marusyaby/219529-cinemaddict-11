import PageController from './controllers/page.js';
import FilmsComponent from './components/films.js';
import FooterStatComponent from './components/footer-stat.js';
import NavigationComponent from './components/navigation.js';
import ProfileComponent from './components/profile.js';
import SortComponent from './components/sort.js';
import {getRandomFilms} from './mock/random-film.js';
import {render} from './utils/render.js';
import {FilmsCount} from './controllers/page.js';

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

const pageController = new PageController(filmsComponent);
pageController.render(films);


