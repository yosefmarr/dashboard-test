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
        this.resetActiveOptions();
        const language = e.target.getAttribute('data-lang');
        e.target.classList.add('active');
        const languageSwitcher = document.getElementById('language-switcher');
        languageSwitcher.querySelector('button').innerText = language;
        this.i18n.setLanguage(language);
        this.updatePageLanguage();
      })
    );
  }
  resetActiveOptions() {
    const languageSwitcher = document.getElementById('language-switcher');
    const languageOptions = languageSwitcher.querySelectorAll('.dropdown-item');
    languageOptions.forEach((language) => language.classList.remove('active'));
  }
  updatePageLanguage() {
    document.title = this.i18n.t('login', 'title');
    document.querySelectorAll('[data-i18n]').forEach((e) => {
      const i18nKey = e.getAttribute('data-i18n');
      const [path, key] = i18nKey.split('.');
      const textSpan = e.querySelector('.lang-text');
      if (textSpan) {
        textSpan.textContent = this.i18n.t(path, key);
      } else {
        e.textContent = this.i18n.t(path, key);
      }
    });
  }
}
