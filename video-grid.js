const NB_COLUMNS = 8;
const NB_ROWS = 3;
var NB_IMAGES = NB_ROWS * NB_COLUMNS;
const INTERVAL_MS = 100;
const NB_IMG = 331;

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
    displayImages();
    resizeVideoGridContainer();
    launchControls();
    setImgSrc(0);
});

function displayImages() {
    const gridContainer = document.querySelector('.grid-container');
    var i;
    console.log("pouet")
    for (i = 0; i < NB_IMAGES; i++) {
        let img = document.createElement('img');
        //img.src = `/dance_images/dance_${img_nb}.jpg`;
        //console.log(img);
        gridContainer.append(img);
    }
}

function setImgSrc(time){
    var images = document.querySelectorAll(".grid-container img")
    var i = time;
    console.log("inImageSetting");

    images.forEach((img) => {
        let img_nb = `${i}`.padStart(5, '0');
        img.src = `http://vincky.com/coucool/2021/dance_images/dance_${img_nb}.jpg`;
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

/*


*/



function launchControls() {
    //const media = document.querySelector('video');
    const controls = document.querySelector('.controls');
    const playOrPause = document.querySelector('.playOrPause');
    const fwdOrRwd = document.querySelector('.fwdOrRwd');
    const playText = "Play the dance";
    const pauseText = "Pause the dance";
    const fwdText = "FORWARD";
    const rwdText = "REWIND";
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
        if(interval) {
            playOrPause.textContent= playText;
            clearInterval(interval);
            interval = null;
            //magicImage.style.visibility = 'hidden';
        } else {
            playOrPause.textContent=pauseText;
            //magicImage.style.visibility = 'visible';
            interval = setInterval(playNext, 200);
        }
    }

    function toggleFwdOrRwd() {
        console.log(fwdOrRwd.textContent);
        if (fwdOrRwd.textContent == rwdText) {
            fwdOrRwd.textContent = fwdText;
        } else {
            fwdOrRwd.textContent = rwdText;
        }
    }

    function playNext() {
        if(fwdOrRwd.textContent == rwdText) {
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
        console.log(time);
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
    let mainRatio = window.innerWidth / (window.innerHeight - 2*parseInt(footerAndHeaderHeight));
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

