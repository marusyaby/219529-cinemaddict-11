const getTopRatedFilms = (filmsArray, filmsCount) => {
  let topRatedFilms = null;

  const hasRating = (film) => {
    return film.rating > 0;
  };

  const sortFilmsByRating = (array) => {
    return array.slice().sort((a, b) => {
      return b.rating - a.rating;
    });
  };

  if (filmsArray.some(hasRating)) {
    topRatedFilms = sortFilmsByRating(filmsArray).slice(0, filmsCount);
  }

  return topRatedFilms;
};

const getMostCommentedFilms = (filmsArray, filmsCount) => {
  let mostCommentedFilms = null;

  const hasComments = (film) => {
    return film.comments.length > 0;
  };

  const sortFilmsByComments = (array) => {
    return array.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  };

  if (filmsArray.some(hasComments)) {
    mostCommentedFilms = sortFilmsByComments(filmsArray).slice(0, filmsCount);
  }

  return mostCommentedFilms;
};

export {
  getMostCommentedFilms,
  getTopRatedFilms,
};
