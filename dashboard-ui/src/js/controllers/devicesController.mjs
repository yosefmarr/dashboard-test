import axios from 'axios';
import compileTemplate from '../../utilities/templateCompiler.mjs';
import devicesTemplate from '../templates/devices.hbs';
import LanguageSwitcher from '../../utilities/languageSwitcher.mjs';
import { getJWTToken } from '../../utilities/jwtDB.mjs';
import i18n from '../i18n.mjs';
import router from '../router.mjs';

const devicesController = {
  async init() {
    try {
      const response = await this.getUserData();
      const { user: userData } = response;
      i18n.setLanguage(userData.config.language);
      document.title = i18n.t('devices', 'title');
      const generateTemplate = compileTemplate(devicesTemplate());
      userData.actualPath = '/devices';
      const html = generateTemplate({ context: userData });
      const appElement = document.getElementById('app');
      if (!appElement) {
        throw new Error('App element not found');
      }
      appElement.innerHTML = html;
      const languageSwitcher = new LanguageSwitcher(i18n, 'devices');
      languageSwitcher.init();
      router.bindNavigationEvents();
    } catch (error) {
      console.error('Error initializing login controller:', error);
    }
  },
  async getUserData() {
    const JWTToken = await getJWTToken();
    const config = {
      headers: { Authorization: `Bearer ${JWTToken}` },
    };
    const response = await axios.get(
      `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/user`,
      config
    );
    if (response.status === 200 && response.data.status === 'success') {
      return response.data;
    }
    throw new Error(response.data.error);
  },
};

export default devicesController;
