$.i18n().load({
  en: 'i18n/en.json',
  fr: 'i18n/fr.json'
}).done(() => {
  $('body').i18n();
  document.querySelectorAll('.languages a').forEach(language => {
    setActive(document.documentElement.getAttribute('lang'));
    language.addEventListener('click', e => {
      switchLocale(language, e.currentTarget.dataset.locale);
    });
  });
});

const switchLocale = (language, dataLocale) => {
  $.i18n().locale = dataLocale;
  document.documentElement.setAttribute('lang', $.i18n().locale);
  setActive(document.documentElement.getAttribute('lang'));
  $('body').i18n();
}

const setActive = (htmlLocale) => {
  document.querySelectorAll('.languages a').forEach(link => {
    if (link.dataset.locale == document.documentElement.getAttribute('lang')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}
