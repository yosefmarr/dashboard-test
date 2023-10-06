import i18n from '../i18n.mjs';

const loginController = {
  init() {
    document.getElementById(
      'app'
    ).innerHTML = `<button class="btn btn-outline-primary" type="button">${i18n.t(
      'login'
    )}</button>`;
  },
};

export default loginController;
