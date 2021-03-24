const hamburger = document.querySelectorAll('.hamburger')
const titles = document.querySelectorAll('.title')
const backButton = document.getElementById('back-button');

hamburger.forEach(button => {
  button.addEventListener('click', e => {
    document.querySelector('#menu').classList.toggle('open');
    hamburger[0].classList.toggle('active');
    hamburger[1].classList.toggle('active');
  });
});


titles.forEach((title, index) => {
  title.addEventListener('click', e => {
    initiateView(title, document.querySelector('#back-button'));
    translateTitles(index, titles, title)
    translateContent(title.parentNode.querySelector('p'), title);
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
  clicked_title.style.transform = `translateY(calc(-${clicked_title.parentNode.offsetTop}px + 120px))`
};

const translateContent = (content, title) => {
  content.style.transform = `translateY(calc(-${title.parentNode.offsetTop}px + 150px))`
  content.style.opacity = 1;
  content.style.height = 'auto';
};

const resetPositions = (title) => {
  title.style.pointerEvents = "auto";
  title.parentNode.querySelector('p').style.opacity = 0;
  title.parentNode.querySelector('p').style.height = 0;
  title.parentNode.querySelector('p').style.transform = 'translateY(0)';
  title.style.transform = "translateY(0)";
}
