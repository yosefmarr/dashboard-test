export default class LanguageSwitcher {
  constructor(i18n, path) {
    this.i18n = i18n;
    this.path = path;
    this.languageSwitchers = document.querySelectorAll('.language-switcher');
    if (!this.languageSwitchers.length) {
      console.error('No language switchers found');
      return;
    }
  }

  init() {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    this.setLangToLanguageSwitcher(selectedLanguage);
    this.languageSwitchers.forEach((languageSwitcher) => {
      languageSwitcher.addEventListener(
        'click',
        this.handleLanguageOptionClick.bind(this)
      );
    });
  }

  handleLanguageOptionClick(e) {
    const languageOption = e.target.closest('.dropdown-item');
    if (languageOption) {
      e.preventDefault();
      this.resetActiveOptions();
      languageOption.classList.add('active');
      const selectedLanguage = languageOption.getAttribute('data-lang');
      this.setLangToLanguageSwitcher(selectedLanguage);
      this.i18n.setLanguage(selectedLanguage);
      this.updatePageLanguage();
    }
  }

  setLangToLanguageSwitcher(language) {
    this.languageSwitchers.forEach((languageSwitcher) => {
      const button = languageSwitcher.querySelector('button');
      if (button) {
        button.innerText = language;
      } else {
        console.error('Button not found in language switcher');
      }
    });
  }

  resetActiveOptions() {
    this.languageSwitchers.forEach((languageSwitcher) => {
      const languageOptions =
        languageSwitcher.querySelectorAll('.dropdown-item');
      languageOptions.forEach((language) =>
        language.classList.remove('active')
      );
    });
  }

  updatePageLanguage() {
    document.title = this.i18n.t(this.path, 'title');
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
