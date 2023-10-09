import Handlebars from 'handlebars';
import { ifEquals } from '../js/templates/helpers/helpers.mjs';
import _navbar from '../js/templates/partials/_navbar.hbs';
import _sidebar from '../js/templates/partials/_sidebar.hbs';

export default (template) => {
  try {
    Handlebars.registerHelper('ifEquals', ifEquals);
    Handlebars.registerPartial('navbar', _navbar);
    Handlebars.registerPartial('sidebar', _sidebar);
    const templateFn = Handlebars.compile(template);
    return templateFn;
  } catch (error) {
    console.error('Error compiling template:', error);
  }
};
