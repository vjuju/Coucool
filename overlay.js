const hamburgers = document.querySelectorAll('.hamburger')
const titles = document.querySelectorAll('.title')
const accordions = document.querySelectorAll('.accordion-item h4');
const menu = document.querySelector('#menu')
const ticket = document.querySelector('#ticket')
const switchMenuLinks = document.querySelectorAll('.switch-menu');
const backToHomeLink = document.getElementById('back-to-home');
let interval = null;

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

accordions.forEach(accordion => {
  accordion.addEventListener('click', e => {
    let activeAccordion = Array.from(document.querySelectorAll('.accordion-item h4')).find(accordion => accordion.parentNode.classList.contains('active'));
    toggleAccordion(activeAccordion, accordion)
  });
});

switchMenuLinks.forEach(link => {
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
      clearInterval(interval);
      crossToArrow(hamburgers);
      translateContent(title.parentNode.querySelector('section'));
      translateTitles(index, Array.from(titles).filter(t => t !== title))
    });
    title.addEventListener('mouseover', e => {
      stereoscopic(title)
      interval = setInterval( e => stereoscopic(title), 1000)
    });
    title.addEventListener('mouseout', e => clearInterval(interval))
  }
});

backToHomeLink.addEventListener('click', e => {
  hamburgers.forEach(button => {
    backToMenu(button)
    hideMenu(ticket, button, menu)
  });
});

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
  let fonts = ['Trash', 'Mantra Alt', 'Harbour', 'Saonara', 'Circular Bold']
  shuffle(fonts)
  fonts.forEach((font, index) => {
    setTimeout(e => element.style.fontFamily = font, index * 200);
  });
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
  content.style.height = '60vh';
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
