const hamburger = document.querySelectorAll('.hamburger')
hamburger.forEach(hamburger => {
  hamburger.addEventListener('click', e => {
    document.querySelector('#menu').classList.toggle('open');
    hamburger.classList.toggle('active');
  });
});

