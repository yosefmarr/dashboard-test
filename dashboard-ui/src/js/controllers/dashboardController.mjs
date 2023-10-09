import axios from 'axios';
import compileTemplate from '../../utilities/templateCompiler.mjs';
import dashboardTemplate from '../templates/dashboard.handlebars';
import { getJWTToken } from '../../utilities/jwtDB.mjs';
import i18n from '../i18n.mjs';

const dashboardController = {
  async init() {
    try {
      const userData = await this.getUserData();
      console.log('userData:', userData);
      document.title = i18n.t('dashboard', 'title');
      const generateTemplate = compileTemplate(dashboardTemplate());
      const html = generateTemplate();
      const appElement = document.getElementById('app');
      if (!appElement) {
        throw new Error('App element not found');
      }
      appElement.innerHTML = html;
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

export default dashboardController;
