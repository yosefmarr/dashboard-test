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
        inputsError: 'Invalid email or password',
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
        inputsError: 'Correo electrónico o contraseña inválidos',
        formError:
          'No se pueden verificar las credenciales. Si continúa experimentando problemas, contacte al soporte.',
      },
    },
  },
  setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
  },
  t(path, key) {
    return (
      this.translations[localStorage.getItem('selectedLanguage') || 'es'][path][
        key
      ] || key
    );
  },
  tO(path) {
    const translationObject =
      this.translations[localStorage.getItem('selectedLanguage') || 'es'][
        path
      ] || {};
    translationObject.lang = localStorage.getItem('selectedLanguage') || 'es';
    return translationObject;
  },
};

export default i18n;
