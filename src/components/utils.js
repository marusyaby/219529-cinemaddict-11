import {DESCRIPTION_LENGTH_MAX} from './const.js';

const formatDuration = (minutesTotal) => {
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  return hours > 0 ?
    hours + `h ` + minutes + `m` :
    minutes + `m`;
};

const formatDescription = (text) => {
  return text.length > DESCRIPTION_LENGTH_MAX ?
    text.substr(0, DESCRIPTION_LENGTH_MAX - 1) + `...` :
    text;
};

const formatReleaseDate = (date) => {
  return date.toLocaleString(`en-GB`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
  });
};

const formatCommentDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.getHours() + `:` + date.getMinutes();

  return `${year}/${month}/${day} ${time}`;
};

export {
  formatDuration,
  formatDescription,
  formatReleaseDate,
  formatCommentDate,
};
