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

const DEFAULT_SORT_TYPE = `default`;

const SORTS = [
  {
    NAME: `default`,
    TYPE: `default`
  },
  {
    NAME: `date`,
    TYPE: `release`
  },
  {
    NAME: `rating`,
    TYPE: `rating`,
  },
];

const Emoji = {
  ANGRY: `angry.png`,
  PUKE: `puke.png`,
  SLEEPING: `sleeping.png`,
  SMILE: `smile.png`,
};

const FilmsSection = {
  ALL: {
    title: `All Films`,
    isExtra: false,
    keyToSort: ``
  },
  TOP_RATED: {
    title: `Top Rated`,
    isExtra: true,
    keyToSort: `rating`
  },
  MOST_COMMENTED: {
    title: `Most Commented`,
    isExtra: true,
    keyToSort: `commentsCount`
  }
};

const FilmsCount = {
  TOTAL: 15,
  ON_START: 5,
  BY_BUTTON: 5,
  EXTRA: 2,
};

export {
  DESCRIPTION_LENGTH_MAX,
  USER_TITLES,
  DEFAULT_SORT_TYPE,
  SORTS,
  Emoji,
  FilmsSection,
  FilmsCount,
};
