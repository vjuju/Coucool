const NB_COLUMNS = 8;
const NB_ROWS = 3;
var NB_IMAGES = NB_ROWS * NB_COLUMNS;
const congrats_images_numbers = [126]
const almost_images_numbers = [45, 84, 140]
const message_types = ['congratulations']
var isPlaying = false;
let interval_ms = 0;


document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('contextmenu', event => event.preventDefault());
    setIntervalMs();
    displayImages();
    resizeVideoGridContainer();
    launchControls();
    setImg(0);
});

function setIntervalMs() {
  if (window.innerWidth <= 780) {
    interval_ms = 250
  } else {
    interval_ms = 225
  }
}

function displayImages() {
    const gridContainer = document.querySelector('.grid-container');
    var i;
    for (i = 0; i < NB_IMAGES; i++) {
        let img = document.createElement('img');
        img.style.gridRow = Math.floor(i / NB_COLUMNS) + 1;
        img.style.gridColumn = i + 1 - Math.floor(i / NB_COLUMNS) * NB_COLUMNS;
        gridContainer.append(img);
    }
}

function setImg(time){
    var images = document.querySelectorAll(".grid-container img");
    var i = time;

    images.forEach((img) => {
        let img_nb = i >= NB_IMG ? i - NB_IMG : i ;
        let img_nb_str = `${img_nb}`.padStart(5, '0');
        img.src = `https://cou.cool/dance_images/dance_${img_nb_str}.jpg`;
        if (congrats_images_numbers.includes(img_nb)) {
            img.onclick = onCongratsImageClick;
        } else if(almost_images_numbers.includes(img_nb)){
            img.onclick = onAlmostImageClick;
        } else {
            img.onclick = onFailImageClick;
        }
        i++;
    })
}

function showContributions(){
    showMessage('contributions');
}

function onFailImageClick(event){
    if(isPlaying) {
        let failImage = document.getElementById("fail-image");
        failImage.src = getRandomFailImage();
        showMessage('bad-timing');
    }
}

function onAlmostImageClick(event){
    const imageClicked = event.target;
    const img_nb = getImgNumber(imageClicked);
    const img_nb_str = `${img_nb}`.padStart(5, '0');
    if (isPlaying) {
        let almostImage = document.getElementById("almost-image");
        almostImage.src = `https://cou.cool/dance_images/dance_${img_nb_str}.jpg`;
        showMessage('almost');
    }
}

function onCongratsImageClick(event){
    if (isPlaying) {
        showMessage('congrats');
    }
}

function getImgNumber(image) {
    const src = image.src
    const regex = /\d+/g;
    const found = src.match(regex);
    const nb = parseInt(found[found.length - 1]);
    return nb
}


function showMessage(message_type){
    if (message_type == 'contributions') {
      document.getElementById('weezuniq580171').style.display = 'block'
    }
    const message = document.getElementById(message_type);
    message.style.visibility = 'visible';
}

function hideMessages(){
    const messages = document.querySelectorAll('.message');
    messages.forEach((message) => message.style.visibility = 'hidden');
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max)+1;
  }

function getRandomFailImage() {
    let randomNumber = getRandomInt(13).toString();
    return `https://cou.cool/fail_images/${randomNumber}.jpg`
}

function launchControls() {
    const controls = document.querySelector('.controls');
    const playOrPause = document.querySelector('.playOrPause');
    const fwdOrRwd = document.querySelector('.fwdOrRwd');
    const explanations = document.querySelectorAll('.explanations');
    const playText = "Dansons";
    const pauseText = "Pause";
    const fwdText = "A l'endroit";
    const rwdText = "A l'envers";
    let interval;
    let time = 0;

    playOrPause.addEventListener('click', playPauseMedia);
    fwdOrRwd.addEventListener('click', toggleFwdOrRwd);

    function playPauseMedia() {
        let images = document.querySelectorAll('#video-grid-container img');
        if(isPlaying) {
            playOrPause.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Let's dance" : "Dansons"
            clearInterval(interval);
            interval = null;
            isPlaying = false;
            explanations.forEach((explanation) => explanation.style.display = 'flex');
        } else {
            playOrPause.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Freeze" : "Pause"
            interval = setInterval(playNext, interval_ms);
            isPlaying = true;
            setTimeout(function() {
                document.querySelectorAll('.explanations').forEach((explanation) => explanation.style.display = 'none')
            }, 500);
        }
        explanations.forEach((explanation) => explanation.classList.toggle("hidden"));
    }

    function toggleFwdOrRwd() {
        if ((fwdOrRwd.textContent == "Backward") || (fwdOrRwd.textContent == "A l'envers" )) {
          fwdOrRwd.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Forward" : "A l'endroit"
        } else {
          fwdOrRwd.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Backward" : "A l'envers"
        }
    }

    function playNext() {
        if((fwdOrRwd.textContent == "Backward") || (fwdOrRwd.textContent == "A l'envers" )) {
            time = (time == 0) ? NB_IMG : time - 1;
        } else {
            time = (time == NB_IMG) ? 0 : time + 1;
        }
        setImg(time);
    }
}

function resizeVideoGridContainer() {
    let videoWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--video-initial-width'));
    let videoHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--video-initial-height'));
    let footerAndHeaderHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-header-height'));
    let videoRatio = videoWidth / videoHeight;
    let mainRatio = window.innerWidth / (window.innerHeight - parseInt(footerAndHeaderHeight));
    let videoGridContainer = document.querySelector("#video-grid-container");
    if (videoRatio >  mainRatio) {
        videoGridContainer.classList.replace("overflowing-height", "overflowing-width");
    } else {
        videoGridContainer.classList.replace("overflowing-width", "overflowing-height");
    }
}

window.onresize = resizeVideoGridContainer;

