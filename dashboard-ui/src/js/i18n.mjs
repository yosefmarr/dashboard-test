const i18n = {
  translations: {
    en: { login: 'Login' },
    es: { login: 'Iniciar sesión' },
  },
  currentLanguage: 'es',
  setLanguage(lang) {
    this.currentLanguage = lang;
  },
  t(key) {
    return this.translations[this.currentLanguage][key] || key;
  },
};

export default i18n;
