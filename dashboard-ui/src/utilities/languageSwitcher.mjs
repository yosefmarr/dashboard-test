export default class LanguageSwitcher {
  constructor(i18n) {
    this.i18n = i18n;
  }
  init() {
    const languageSwitcher = document.getElementById('language-switcher');
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    languageSwitcher.querySelector('button').innerText = selectedLanguage;
    const languageOptions = languageSwitcher.querySelectorAll('.dropdown-item');
    languageOptions.forEach((language) =>
      language.addEventListener('click', (e) => {
        e.preventDefault();
        const language = e.target.getAttribute('data-lang');
        const languageSwitcher = document.getElementById('language-switcher');
        languageSwitcher.querySelector('button').innerText = language;
        this.i18n.setLanguage(language);
        this.updatePageLanguage();
      })
    );
  }
  updatePageLanguage() {
    document.title = this.i18n.t('login', 'title');
    document.querySelectorAll('[data-i18n]').forEach((e) => {
      const i18nKey = e.getAttribute('data-i18n');
      const [path, key] = i18nKey.split('.');
      e.textContent = this.i18n.t(path, key);
    });
  }
}
