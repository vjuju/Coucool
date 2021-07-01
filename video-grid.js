const NB_COLUMNS = 8;
const NB_ROWS = 3;
var NB_IMAGES = NB_ROWS * NB_COLUMNS;
const congrats_images_numbers = [126]
const almost_images_numbers = [45, 84, 140]
const message_types = ['congratulations']
var isPlaying = false;
let interval_ms = 0;
/*
class VideoPlayer extends HTMLElement {
    constructor() {
        // Toujours appeler "super" d'abord dans le constructeur
        super();

        // Ecrire la fonctionnalité de l'élément ici
        var shadow = this.attachShadow({mode: 'open'});

        // Création des spans
        var video = document.createElement('video');
        var style = document.createElement('style');
        var source = document.createElement('style');
        style.textContent = 'video {object-fit:cover; height: 100%; width: 100%;}'

        wrapper.setAttribute('class','wrapper');
        var icon = document.createElement('span');
        icon.setAttribute('class','icon');
        icon.setAttribute('tabindex', 0);
        var info = document.createElement('span');
        info.setAttribute('class','info');

        // Prendre le contenu de l'attribut et le mettre dans le span d'info
        var text = this.getAttribute('text');
        info.textContent = text;

        // Insérer l'icône
        var imgUrl;
        if(this.hasAttribute('source')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'img/default.png';
        }
        var img = document.createElement('img');
        img.src = imgUrl;
        icon.appendChild(img);



        // Attacher les éléments créés au dom fantôme
        shadow.appendChild(style);
    }
  }
*/



document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('contextmenu', event => event.preventDefault());
    setIntervalMs();
    displayImages();
    resizeVideoGridContainer();
    launchControls();
    setImgSrc(0);
});

function setIntervalMs() {
  if (window.innerWidth <= 780) {
    interval_ms = 300
  } else {
    interval_ms = 500
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

function setImgSrc(time){
    var images = document.querySelectorAll(".grid-container img");
    var i = time;

    images.forEach((img) => {
        let img_nb = i >= NB_IMG ? i - NB_IMG : i ;
        let img_nb_str = `${img_nb}`.padStart(5, '0');
        img.src = `http://vincky.com/coucool/2021/dance_images/dance_${img_nb_str}.jpg`;
        /*
        if (true) {
            img.classList.add('clickable');
            img.addEventListener('click', showContributions);
        } else {
            img.classList.remove('clickable');
            img.removeEventListener('click');
        }
        */
        i++;
    })

    /*
    var i;
    for (i = 0; i < nb_images; i++) {
        let img_nb = `${i}`.padStart(5, '0');
        console.log(img_nb)
        let img = document.createElement('img');
        img.src = `/dance_images/dance_${img_nb}.jpg`;
        console.log(img);
        gridContainer.append(img);
    }*/
}

function showContributions(){
    //console.log("shouldShowContributions");
    showMessage('contributions');
}

function onImageClick(event){
    /*if (colorful_images_numbers.includes(i)) {*/
    const imageClicked = event.target;
    console.log(event.target)
    const img_nb = getImgNumber(imageClicked);
    const img_nb_str = `${img_nb}`.padStart(5, '0');
    if (congrats_images_numbers.includes(img_nb)) {
        let congratsImage = document.getElementById("congrats-image");
        congratsImage.src = `http://vincky.com/coucool/2021/dance_images/dance_${img_nb_str}.jpg`;
        showMessage('congrats');
    } else if(almost_images_numbers.includes(img_nb)){
        let almostImage = document.getElementById("almost-image");
        almostImage.src = `http://vincky.com/coucool/2021/dance_images/dance_${img_nb_str}.jpg`;
        showMessage('almost');
    } else {
        let failImage = document.getElementById("fail-image");
        failImage.src = getRandomFailImage();
        showMessage('bad-timing');
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
    return `http://vincky.com/coucool/2021/fail_images/${randomNumber}.jpg`
}
  

/*


*/



function launchControls() {
    //const media = document.querySelector('video');
    const controls = document.querySelector('.controls');
    const playOrPause = document.querySelector('.playOrPause');
    const fwdOrRwd = document.querySelector('.fwdOrRwd');
    const explanations = document.querySelectorAll('.explanations');
    const playText = "Dansons";
    const pauseText = "Pause";
    const fwdText = "A l'endroit";
    const rwdText = "A l'envers";
    //const magicImage = document.querySelector(".magic-image");
    let interval;
    let time = 0;
    // time here is the index of the first top left corner image in the grid,
    // it can go up to 330

    //media.removeAttribute('controls');
    //controls.style.visibility = 'visible';

    playOrPause.addEventListener('click', playPauseMedia);
    fwdOrRwd.addEventListener('click', toggleFwdOrRwd);

    function playPauseMedia() {
        let images = document.querySelectorAll('#video-grid-container img');
        //console.log(images);
        if(isPlaying) {
            playOrPause.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Let's dance" : "Dansons"
            images.forEach((image) => image.removeEventListener('click', onImageClick));
            clearInterval(interval);
            interval = null;
            isPlaying = false;
            explanations.forEach((explanation) => explanation.style.display = 'flex');
            //magicImage.style.visibility = 'hidden';
        } else {
            images.forEach((image) => image.addEventListener('click', onImageClick));
            /*clickables.forEach((clickable) => clickable.addEventListener('click', showMessage));*/
            playOrPause.textContent = document.documentElement.getAttribute('lang') === 'en' ? "Freeze" : "Pause"
            //magicImage.style.visibility = 'visible';
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

            /*
            if(media.currentTime <= 0.2) {
                media.currentTime = media.duration;
            } else {
                media.currentTime -= 0.2;
            } */
        } else {
            time = (time == NB_IMG) ? 0 : time + 1;
            /*
            if(media.currentTime >= media.duration - 0.2) {
                media.currentTime = 0;
            } else {
                media.currentTime += 0.2;
            }
            */
        }
        setImgSrc(time);
        //setMagicImage();
    }

    /*
    function setMagicImage() {
        const nb_columns = 8;
        const nb_rows = 3;
        if(fwdOrRwd.textContent == rwdText) {
            if (parseInt(magicImage.style.gridColumn) >= 0) {
                if(parseInt(magicImage.style.gridColumn) == 1) {
                    magicImage.style.gridColumn = nb_columns;
                    if(parseInt(magicImage.style.gridRow) == 1) {
                        magicImage.style.gridRow = nb_rows;
                    } else {
                        magicImage.style.gridRow = parseInt(magicImage.style.gridRow) - 1;
                    }
                } else {
                    magicImage.style.gridColumn = parseInt(magicImage.style.gridColumn) - 1;
                }
            } else {
                magicImage.style.gridColumn = nb_columns
                magicImage.style.gridRow = nb_rows
            }
        } else {
            if (parseInt(magicImage.style.gridColumn) >= 0) {
                if(parseInt(magicImage.style.gridColumn) == nb_columns) {
                    magicImage.style.gridColumn = 1;
                    if(parseInt(magicImage.style.gridRow) == nb_rows) {
                        magicImage.style.gridRow = 1;
                    } else {
                        magicImage.style.gridRow = parseInt(magicImage.style.gridRow) + 1;
                    }
                } else {
                    magicImage.style.gridColumn = parseInt(magicImage.style.gridColumn) + 1;
                }
            } else {
                magicImage.style.gridColumn = 1
                magicImage.style.gridRow = 1
            }
        }
    }
    */

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
    //heightOutput.textContent = window.innerHeight;
    //widthOutput.textContent = window.innerWidth;
}

window.onresize = resizeVideoGridContainer;

