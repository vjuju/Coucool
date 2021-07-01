const hamburgers = document.querySelectorAll('.hamburger')
const titles = document.querySelectorAll('.title')
const accordions = document.querySelectorAll('.accordion-item h4');
const menu = document.querySelector('#menu')
const ticket = document.querySelector('#ticket')
let interval = null;
let timeOuts = [];
const fonts = ['Trash', 'Mantra Alt', 'Harbour', 'Saonara', 'Circular Bold']

$.i18n().load({
  en: 'i18n/en.json',
  fr: 'i18n/fr.json'
}).done(() => {
  $('body').i18n();
  setWeezeventSrc();
  initializeLanguages();
  backToHome();
  switchMenus();
  handleHamburgerClick();
  initializeAccordions();
  initializeTitles();
});

const setWeezeventSrc = () => {
  console.log($.i18n().locale)
  const locale = $.i18n().locale === 'en' ? 'en-GB' : 'fr-FR'
  document.querySelector('iframe').src = `https://widget.weezevent.com/ticket/E724948/?code=30127&locale=${locale}&width_auto=1&color_primary=FFD6AC&v=2`
}

const initializeLanguages = () => {
  document.querySelectorAll('.languages a').forEach(language => {
    setActive(document.documentElement.getAttribute('lang'));
    language.addEventListener('click', e => {
      switchLocale(language, e.currentTarget.dataset.locale);
    });
  });
}

const initializeTitles = () => {
  titles.forEach((title, index) => {
    if (window.innerWidth <= 780) {
      title.addEventListener('click', e => {
        stereoscopic(title)
        hamburgers.forEach(button => {
          button.classList.remove('cross')
          button.classList.add('arrow')
        })
        translateContent(title.parentNode.querySelector('section'));
        translateTitles(index, Array.from(titles).filter(t => t !== title))
      });
    } else {
      title.addEventListener('click', e => {
        timeOuts.forEach(t => clearTimeout(t));
        clearInterval(interval);
        crossToArrow(hamburgers);
        translateContent(title.parentNode.querySelector('section'));
        translateTitles(index, Array.from(titles).filter(t => t !== title))
      });
      title.addEventListener('mouseover', e => {
        stereoscopic(title)
        interval = setInterval( e => stereoscopic(title), 1000)
      });
      title.addEventListener('mouseout', e => {
        timeOuts.forEach(t => clearTimeout(t))
        clearInterval(interval)
      });
    }
  });
}

const initializeAccordions = () => {
  accordions.forEach(accordion => {
    accordion.addEventListener('click', e => {
      let activeAccordion = Array.from(document.querySelectorAll('.accordion-item h4')).find(accordion => accordion.parentNode.classList.contains('active'));
      toggleAccordion(activeAccordion, accordion)
    });
  });
}

const handleHamburgerClick = () => {
  hamburgers.forEach(button => {
    button.addEventListener('click', e => {
      if (button.classList.contains('cross')) {
        hideMenu(ticket, button, menu)
      } else if (button.classList.contains('arrow')) {
        backToMenu(button)
      } else {
        showMenu(ticket, menu)
      }
    });
  });
}
const switchLocale = (language, dataLocale) => {
  $.i18n().locale = dataLocale;
  document.documentElement.setAttribute('lang', $.i18n().locale);
  setActive(document.documentElement.getAttribute('lang'));
  setWeezeventSrc();
  $('body').i18n();
  backToHome();
  switchMenus();
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

const backToHome = () => {
  document.getElementById('back-to-home').addEventListener('click', e => {
    hamburgers.forEach(button => {
      backToMenu(button)
      hideMenu(ticket, button, menu)
    });
  });
}


const switchMenus = () => {
  document.querySelectorAll('.switch-menu').forEach(link => {
    link.addEventListener('click', e => {
      titleToDisplay = document.getElementById(link.getAttribute('href').substring(1)).previousElementSibling
      menuIndex = Array.from(titles).findIndex(title => title === titleToDisplay)
      otherTitles = Array.from(titles).filter(t => t !== titleToDisplay)
      if (menu.classList.contains('open')) {
        resetPositions(titles)
      } else {
        menu.classList.add('open');
        crossToArrow(hamburgers);
      }
      setTimeout(e => {
        translateContent(titleToDisplay.parentNode.querySelector('section'))
        translateTitles(menuIndex, otherTitles)
      }, 200)
    });
  });
}

const crossToArrow = (hamburgers) => {
  hamburgers.forEach(button => {
    button.classList.remove('cross')
    button.classList.add('arrow')
  })
};


const shuffle  = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const hideMenu = (ticket, button, menu) => {
  button.classList.remove('cross')
  menu.classList.remove('open');
}

const backToMenu = (button) => {
  resetPositions(titles);
  button.classList.remove('arrow')
  button.classList.add('cross')
}

const showMenu = (ticket, menu) => {
  hamburgers.forEach(button => button.classList.add('cross'))
  menu.classList.add('open');
}


const stereoscopic = (element) => {
  shuffle(fonts)
  fonts.forEach((font, index) => {
    timeOuts.push(setTimeout(e => element.style.fontFamily = font, index * 200));
  })
};

const toggleAccordion = (active, element) => {
  if (active) {
    active.parentNode.classList.remove('active');
  }
  if (active !== element) {
    element.parentNode.classList.add('active');
  }
}

const translateTitles = (position, titles) => {
  titles.forEach((title, index) => {
    title.style.transform = `translateY(${index < position ? '-' : ''}100vh)`;
    title.parentNode.classList.add('no-height');
  });
  if (window.innerWidth <= 780) {
    document.querySelector('.menu-right').style.marginBottom = 0;
    document.querySelector('.languages').classList.add('hidden');
    document.querySelector('.menu-left').classList.add('visible');
  }
};

const translateContent = (content) => {
  content.style.opacity = 1;
  content.style.height = '70vh';
};

const resetPositions = (titles) => {
  titles.forEach(title => {
    title.parentNode.classList.remove('no-height');
    title.parentNode.querySelector('section').style.height = 0;
    title.parentNode.querySelector('section').style.opacity = 0;
    if (window.innerWidth <= 780) {
      document.querySelector('.menu-right').style.marginBottom = `1rem`;
      document.querySelector('.menu-left').classList.remove('visible');
      document.querySelector('.languages').classList.remove('hidden');
    }
    title.style.transform = "translateY(0)";
  });
}
