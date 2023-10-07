const i18n = {
  translations: {
    en: {
      dashboard: {
        title: 'Dashboard',
      },
      login: {
        title: 'Login',
        email: 'Email address',
        emailError: 'Please provide a valid email',
        password: 'Password',
        passwordError: 'Please provide a password',
        signIn: 'Sign in',
        formError:
          'Unable to verify credentials. If you continue to experience problems, contact support.',
      },
    },
    es: {
      dashboard: {
        title: 'Panel',
      },
      login: {
        title: 'Iniciar sesión',
        email: 'Correo electrónico',
        emailError: 'Por favor, proporciona un correo electrónico válido',
        password: 'Contraseña',
        passwordError: 'Por favor, proporciona una contraseña',
        signIn: 'Acceder',
        formError:
          'No se pueden verificar las credenciales. Si continúa experimentando problemas, contacte al soporte.',
      },
    },
  },
  currentLanguage: 'es',
  setLanguage(lang) {
    this.currentLanguage = lang;
  },
  t(path, key) {
    return this.translations[this.currentLanguage][path][key] || key;
  },
  tO(path) {
    return this.translations[this.currentLanguage][path] || {};
  },
};

export default i18n;
