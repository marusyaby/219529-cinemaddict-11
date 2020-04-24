const DESCRIPTION_LENGTH_MAX = 140;

const USER_TITLES = [
  {
    NAME: `Novice`,
    FILMS_MIN: 1,
    FILMS_MAX: 10
  },
  {
    NAME: `Fan`,
    FILMS_MIN: 11,
    FILMS_MAX: 20
  },
  {
    NAME: `Movie Buff`,
    FILMS_MIN: 21,
    FILMS_MAX: Number.MAX_VALUE
  }
];

const SORT_NAMES = [
  `default`,
  `date`,
  `rating`,
];

const Emoji = {
  ANGRY: `angry.png`,
  PUKE: `puke.png`,
  SLEEPING: `sleeping.png`,
  SMILE: `smile.png`,
};

const FilmsSection = {
  All: {
    title: `All Films`,
    isExtra: false,
    keyToSort: ``
  },
  TopRated: {
    title: `Top Rated`,
    isExtra: true,
    keyToSort: `rating`
  },
  MostCommented: {
    title: `Most Commented`,
    isExtra: true,
    keyToSort: `commentsCount`
  }
};

export {
  DESCRIPTION_LENGTH_MAX,
  USER_TITLES,
  SORT_NAMES,
  Emoji,
  FilmsSection,
};
