import axios from 'axios';
import compileTemplate from '../../utilities/templateCompiler.mjs';
import loginTemplate from '../templates/login.handlebars';
import i18n from '../i18n.mjs';
import router from '../router.mjs';
import { setJWTToken } from '../../utilities/jwtDB.mjs';
import {
  validateEmail,
  validatePassowrd,
} from '../../utilities/formValidation.mjs';
import LanguageSwitcher from '../../utilities/languageSwitcher.mjs';

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
    form.addEventListener('blur', this.handleBur.bind(this), true);
  },
  handleBur(event) {
    const { target } = event;
    if (target.id === 'email') {
      this.validateInput(target, validateEmail);
    } else if (target.id === 'password') {
      this.validateInput(target, validatePassowrd);
    }
  },
  validateInput(inputElement, validationFunction) {
    inputElement.classList.remove('is-valid', 'is-invalid');
    const validationClass = validationFunction(inputElement.value)
      ? 'is-valid'
      : 'is-invalid';
    inputElement.classList.add(validationClass);
  },
  showFormErrorMessage(error) {
    const form = document.getElementById('login-form');
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute('id', 'error-form-message');
    errorDiv.classList.add('alert', 'alert-danger');
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
    this.removeFormErrorMessage();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    this.validateInput(emailInput, validateEmail);
    this.validateInput(passwordInput, validatePassowrd);

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
      this.showFormErrorMessage(response.data.error);
    } catch (error) {
      if (error.response && error.response.data) {
        this.showFormErrorMessage(i18n.t('login', 'inputsError'));
        return;
      }
      this.showFormErrorMessage(i18n.t('login', 'formError'));
    }
  },
};

export default loginController;
