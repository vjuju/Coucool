const hamburger = document.querySelectorAll('.hamburger')
const titles = document.querySelectorAll('.title')
const backButton = document.getElementById('back-button');
const accordions = document.querySelectorAll('.accordion-item h4');
let interval = null;

hamburger.forEach(button => {
  button.addEventListener('click', e => {
    if (menu.classList.contains('open')) {
     document.querySelector('#ticket').classList.toggle('no-height')
  } else {
    setTimeout(e => document.querySelector('#ticket').classList.toggle('no-height'), 500);
  }
    document.querySelector('#menu').classList.toggle('open');
    hamburger[0].classList.toggle('active');
    hamburger[1].classList.toggle('active');
  });
});

accordions.forEach(accordion => {
  accordion.addEventListener('click', e => {
    let activeAccordion = Array.from(document.querySelectorAll('.accordion-item h4')).find(accordion => accordion.parentNode.classList.contains('active'));
    toggleAccordion(activeAccordion, accordion)
  });
});

titles.forEach((title, index) => {
  title.addEventListener('click', e => {
    clearInterval(interval);
    initiateView(title, document.querySelector('#back-button'));
    translateContent(title.parentNode.querySelector('section'));
    translateTitles(index, Array.from(titles).filter(t => t !== title), title)
  });
  let initial_font = getComputedStyle(title).getPropertyValue("font-family");
  title.addEventListener('mouseover', e => {
    stereoscopic(title, initial_font)
    interval = setInterval( e => stereoscopic(title, initial_font), 800)
  });
  title.addEventListener('mouseout', e => {
    clearInterval(interval)
  });
});


backButton.addEventListener('click', e => {
  titles.forEach(title => {
    e.currentTarget.style.opacity = 0;
    resetPositions(title);
  });
});


const stereoscopic = (element, initial_font) => {
  let fonts = ['Trash', 'Mantra Alt', 'Harbour', 'Saonara', 'Circular'].filter(f => f !== initial_font)
  fonts.push(initial_font)
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

const initiateView = (title, button) => {

  button.style.opacity = 1;
};

const translateTitles = (position, titles, clicked_title) => {
  if (window.innerWidth <= 780) {
    document.querySelector('.menu-right').style.marginBottom = 0;
    document.querySelector('.languages').classList.add('hidden');
    document.querySelector('.menu-left').classList.add('visible');
  }
   titles.forEach((title, index) => {
    title.style.transform = `translateY(${index < position ? '-' : ''}100vh)`;
    title.parentNode.classList.add('no-height');
  });
};

const translateContent = (content, title) => {
  content.style.opacity = 1;
  content.style.height = '60vh';
};

const resetPositions = (title) => {
  title.parentNode.classList.remove('no-height');

  title.parentNode.querySelector('section').style.height = 0;
  title.parentNode.querySelector('section').style.opacity = 0;
  if (window.innerWidth <= 780) {
    document.querySelector('.menu-right').style.marginBottom = `${window.innerWidth >= 360 ? '3' : '1'}rem`;
    document.querySelector('.menu-left').classList.remove('visible');
    document.querySelector('.languages').classList.remove('hidden');
  }
  title.style.transform = "translateY(0)";
}
