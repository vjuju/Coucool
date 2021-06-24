const loader = document.getElementById('loader');
['Trash', 'Mantra Alt', 'Harbour', 'Saonara', 'Circular Bold'].forEach((font, index) => {
  setTimeout(e => loader.style.fontFamily = font, index * 600);
})
setTimeout(e => {
  loader.style.opacity = 0;
  setTimeout(e => loader.style.display = 'none', 700);
}, 3000)

