import i18n from '../i18n.mjs';

const loginController = {
  init() {
    document.getElementById('app').innerText = i18n.t('login');
  },
};

export default loginController;
