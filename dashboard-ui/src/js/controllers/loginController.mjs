import axios from 'axios';
import compileTemplate from '../../utilities/templateCompiler.mjs';
import loginTemplate from '../templates/login.handlebars';
import i18n from '../i18n.mjs';
import router from '../router.mjs';
import { setJWTToken } from '../../utilities/jwtDB.mjs';

const loginController = {
  init() {
    try {
      document.title = i18n.t('login', 'login');
      const generateTemplate = compileTemplate(loginTemplate());
      const html = generateTemplate(i18n.tO('login'));
      const appElement = document.getElementById('app');
      if (!appElement) {
        throw new Error('App element not found');
      }
      appElement.innerHTML = html;
      document
        .getElementById('login-form')
        .addEventListener('submit', this.handleSubmit.bind(this));
      const that = this;
      document.getElementById('email').addEventListener('blur', function () {
        that.validateEmailInput(this);
      });
      document.getElementById('password').addEventListener('blur', function () {
        that.validatePassowrdInput(this);
      });
    } catch (error) {
      console.error('Error initializing login controller:', error);
    }
  },
  validateEmailInput(emailInput) {
    emailInput.classList.remove('is-valid', 'is-invalid');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let emailInputClass = 'is-invalid';
    if (emailRegex.test(emailInput.value)) {
      emailInputClass = 'is-valid';
    }
    emailInput.classList.add(emailInputClass);
  },
  validatePassowrdInput(passwordInput) {
    passwordInput.classList.remove('is-valid', 'is-invalid');
    let passwordInputClass = 'is-invalid';
    if (passwordInput.value.trim() !== '') {
      passwordInputClass = 'is-valid';
    }
    passwordInput.classList.add(passwordInputClass);
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

    this.validateEmailInput(emailInput);
    this.validatePassowrdInput(passwordInput);

    if (
      emailInput.classList.contains('is-invalid') ||
      passwordInput.classList.contains('is-invalid')
    ) {
      return;
    }

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
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
        this.showFormErrorMessage(error.response.data.error);
        return;
      }
      this.showFormErrorMessage(
        'Unable to verify credentials. If you continue to experience problems, contact support.'
      );
    }
  },
};

export default loginController;
