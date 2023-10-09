import axios from 'axios';
import compileTemplate from '../../utilities/templateCompiler.mjs';
import loginTemplate from '../templates/login.hbs';
import i18n from '../i18n.mjs';
import router from '../router.mjs';
import LanguageSwitcher from '../../utilities/languageSwitcher.mjs';
import { setJWTToken } from '../../utilities/jwtDB.mjs';
import {
  validateEmail,
  validatePassword,
} from '../../utilities/formValidation.mjs';

const toggleValidationClasses = (element, isValid) => {
  const validationClass = isValid ? 'is-valid' : 'is-invalid';
  element.classList.remove('is-valid', 'is-invalid');
  element.parentNode.classList.remove('is-valid', 'is-invalid');
  element.classList.add(validationClass);
  element.parentNode.classList.add(validationClass);
};

const loginController = {
  init() {
    try {
      const languageSwitcher = new LanguageSwitcher(i18n);
      document.title = i18n.t('login', 'title');
      const generateTemplate = compileTemplate(loginTemplate());
      const html = generateTemplate(i18n.tO('login'));
      const appElement = document.getElementById('app');
      if (!appElement) {
        throw new Error('App element not found');
      }
      appElement.innerHTML = html;
      this.bindEvents();
      languageSwitcher.init();
    } catch (error) {
      console.error('Error initializing login controller:', error);
    }
  },
  bindEvents() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));
    form.addEventListener('blur', this.handleBlur.bind(this), true);
    form.addEventListener(
      'focus',
      this.removeFormErrorMessage.bind(this),
      true
    );
  },
  handleBlur(event) {
    const { target } = event;
    let validationFunction;
    if (target.id === 'email') {
      validationFunction = validateEmail;
    } else if (target.id === 'password') {
      validationFunction = validatePassword;
    } else {
      return;
    }
    const isValid = validationFunction(target.value);
    toggleValidationClasses(target, isValid);
  },
  validateInput(inputElement, validationFunction) {
    const isValid = validationFunction(inputElement.value);
    toggleValidationClasses(inputElement, isValid);
  },
  showFormErrorMessage(error, type) {
    const form = document.getElementById('login-form');
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute('id', 'error-form-message');
    errorDiv.setAttribute('data-i18n', type);
    errorDiv.classList.add('callout', 'callout-danger', 'mt-3');
    errorDiv.innerText = error;
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
  },
  removeFormErrorMessage() {
    const errorDiv = document.getElementById('error-form-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  },
  async handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById('btn-submit');
    submitButton.setAttribute('disabled', 'disabled');
    this.removeFormErrorMessage();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    this.validateInput(emailInput, validateEmail);
    this.validateInput(passwordInput, validatePassword);

    if (
      emailInput.classList.contains('is-invalid') ||
      passwordInput.classList.contains('is-invalid')
    ) {
      return;
    }

    try {
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const response = await axios.post(
        `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200 && response.data.status === 'success') {
        await setJWTToken(response.data.token);
        return router.navigateTo('/');
      }
      this.showFormErrorMessage(i18n.t('login', 'formError', 'formError'));
      submitButton.removeAttribute('disabled');
    } catch (error) {
      this.handleError(error);
      submitButton.removeAttribute('disabled');
    }
  },
  handleError(error) {
    if (error.response && error.response.data) {
      this.showFormErrorMessage(i18n.t('login', 'inputsError'), 'inputsError');
    } else {
      this.showFormErrorMessage(i18n.t('login', 'formError', 'formError'));
    }
    console.error(error);
  },
};

export default loginController;
