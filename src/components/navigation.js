const filterFilms = (filmsArray) => {
  return ([
    {
      name: `All movies`,
      results: filmsArray,
    },
    {
      name: `Watchlist`,
      results: filmsArray.filter((film) =>
        film.isInList),
    },
    {
      name: `History`,
      results: filmsArray.filter((film) =>
        film.isWatched),
    },
    {
      name: `Favorites`,
      results: filmsArray.filter((film) =>
        film.isFavourite),
    }
  ]);
};

const createFiltersMarkup = (filmsArray) => {
  const filters = filterFilms(filmsArray);

  return filters.map((filter, index) => {
    const {name, results} = filter;

    const activeClass = index === 0 ? `main-navigation__item--active` : ``;
    const count = index === 0 ? `` : `<span class="main-navigation__item-count">${results.length}</span>`;

    return (
      `<a href="#${name}" class="main-navigation__item ${activeClass}">
        ${name}
        ${count}
       </a>`
    );
  }).join(`\n`);
};

const createNavigationTemplate = (filmsArray) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFiltersMarkup(filmsArray)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {
  createNavigationTemplate,
};
