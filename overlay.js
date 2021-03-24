const hamburger = document.querySelectorAll('.hamburger')
const titles = document.querySelectorAll('.title')
const backButton = document.getElementById('back-button');
const accordions = document.querySelectorAll('.accordion-item h4');

hamburger.forEach(button => {
  button.addEventListener('click', e => {
    document.querySelector('#menu').classList.toggle('open');
    hamburger[0].classList.toggle('active');
    hamburger[1].classList.toggle('active');
  });
});

accordions.forEach(accordion => {
  accordion.addEventListener('click', e => {
    let activeAccordion = Array.from(document.querySelectorAll('.accordion-item h4')).find(accordion => accordion.parentNode.classList.contains('active'))
    if (activeAccordion) {
      activeAccordion.parentNode.classList.remove('active');
    }
    accordion.parentNode.classList.add('active');
  });
});

titles.forEach((title, index) => {
  title.addEventListener('click', e => {
    initiateView(title, document.querySelector('#back-button'));
    translateTitles(index, titles, title)
    translateContent(title.parentNode.querySelector('section'));

  });
});


backButton.addEventListener('click', e => {
  titles.forEach(title => {
    e.currentTarget.style.opacity = 0;
    resetPositions(title);
  });
});

const initiateView = (title, button) => {
  title.style.pointerEvents = "none";
  button.style.opacity = 1;
};
const translateTitles = (position, titles, clicked_title) => {
  titles.forEach(title => {
    if (title !== clicked_title) {
      title.classList.add('no-height');
      title.parentNode.classList.add('no-height');
    }
  });
  if (window.innerWidth <= 780) {
    document.querySelector('.languages').classList.add('hidden');
    document.querySelector('.menu-left').classList.add('visible');
  }
  if (position === 0) {
    titles[1].style.transform = "translateY(80vh)"
    titles[2].style.transform = "translateY(90vh)"
    titles[3].style.transform = "translateY(100vh)"
  } else if (position === 1) {
    titles[0].style.transform = "translateY(-70vh)"
    titles[2].style.transform = "translateY(80vh)"
    titles[3].style.transform = "translateY(90vh)"
  } else if (position === 2) {
    titles[0].style.transform = "translateY(-70vh)"
    titles[1].style.transform = "translateY(-80vh)"
    titles[3].style.transform = "translateY(80vh)"
  } else {
    titles[0].style.transform = "translateY(-80vh)"
    titles[1].style.transform = "translateY(-90vh)"
    titles[2].style.transform = "translateY(-100vh)"
  }
};

const translateContent = (content, title) => {
  content.style.opacity = 1;
  content.style.height = '70vh';
};

const resetPositions = (title) => {
  title.parentNode.querySelector('section').style.height = 0;
  title.style.pointerEvents = "auto";
  title.parentNode.querySelector('section').style.opacity = 0;


  if (window.innerWidth <= 780) {
    document.querySelector('.menu-left').classList.remove('visible');
    document.querySelector('.languages').classList.remove('hidden');
  }
    title.style.transform = "translateY(0)";
    title.classList.remove('no-height');
    title.parentNode.classList.remove('no-height');
}
