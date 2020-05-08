import {remove, render} from '../utils/render.js';
import FilmDetailsComponent from '../components/film-details.js';
import CommentsComponent from '../components/comments.js';
import FilmCardComponent from '../components/film-card.js';

export default class Film {
  constructor(container) {
    this._container = container;
    this._filmDetailsComponent = null;
    this._commentsComponent = null;
    this._filmCardComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
  }

  render(film) {
    this._commentsComponent = new CommentsComponent(film.comments);
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setPosterClickHandler(this._openFilmDetails);
    this._filmCardComponent.setTitleClickHandler(this._openFilmDetails);
    this._filmCardComponent.setCommentsClickHandler(this._openFilmDetails);

    render(this._container, this._filmCardComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _closeFilmDetails() {
    remove(this._filmDetailsComponent);
    remove(this._commentsComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _openFilmDetails() {
    if (document.body.querySelector(`.film-details`)) {
      document.body.querySelector(`.film-details`).remove();
    }

    const detailsBottomContainer = this._filmDetailsComponent.getElement()
    .querySelector(`.form-details__bottom-container`);

    render(document.body, this._filmDetailsComponent);
    render(detailsBottomContainer, this._commentsComponent);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetails);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}
