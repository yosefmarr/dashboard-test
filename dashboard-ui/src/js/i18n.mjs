import axios from 'axios';
import { getJWTToken } from '../utilities/jwtDB.mjs';

const i18n = {
  translations: {
    en: {
      nav: {
        title: 'Dashboard',
        account: 'Account',
        logout: 'Log out',
      },
      layout: {
        home: 'Home',
        settings: 'Settings',
        devices: 'Devices',
        admin: 'Admin',
      },
      dashboard: {
        title: 'Dashboard',
      },
      settings: {
        title: 'Settings',
      },
      devices: {
        title: 'Devices',
      },
      admin: {
        title: 'Admin',
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
      nav: {
        title: 'Panel',
        account: 'Cuenta',
        logout: 'Cerrar sesión',
      },
      layout: {
        home: 'Inicio',
        settings: 'Configuración',
        devices: 'Dispositivos',
        admin: 'Admin',
      },
      dashboard: {
        title: 'Panel',
      },
      settings: {
        title: 'Configuraciones',
      },
      devices: {
        title: 'Dispositivos',
      },
      admin: {
        title: 'Admin',
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
  async setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    try {
      const JWTToken = await getJWTToken();
      if (JWTToken) {
        const response = await axios.post(
          `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/user/settings/language`,
          {
            language: lang,
          },
          {
            headers: { Authorization: `Bearer ${JWTToken}` },
          }
        );
        if (response.status !== 200 || response.data.status !== 'success') {
          console.error(response.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
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
