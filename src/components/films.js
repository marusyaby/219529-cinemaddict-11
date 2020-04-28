import AbstractComponent from './abstract.js';

const createFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
