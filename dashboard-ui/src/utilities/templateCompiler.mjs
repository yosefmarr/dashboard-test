import Handlebars from 'handlebars';

export default (template) => {
  try {
    const templateFn = Handlebars.compile(template);
    return templateFn;
  } catch (error) {
    console.error('Error compiling template:', error);
  }
};
