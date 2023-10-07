import compileTemplate from '../../utilities/templateCompiler.mjs';
import dashboardTemplate from '../templates/dashboard.handlebars';
import i18n from '../i18n.mjs';

const dashboardController = {
  init() {
    try {
      document.title = i18n.t('dashboard');
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
};

export default dashboardController;
