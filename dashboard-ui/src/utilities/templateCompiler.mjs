import Handlebars from 'handlebars';
import { ifEquals } from '../js/templates/helpers/helpers.mjs';

export default (template) => {
  try {
    Handlebars.registerHelper('ifEquals', ifEquals);
    const templateFn = Handlebars.compile(template);
    return templateFn;
  } catch (error) {
    console.error('Error compiling template:', error);
  }
};
