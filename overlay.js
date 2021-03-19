const hamburger = document.querySelector('.hamburger')
hamburger.addEventListener('click', e => {
  document.querySelector('#menu').classList.toggle('open');
  hamburger.classList.toggle('active');
})
