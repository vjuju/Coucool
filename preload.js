const NB_IMG = 166;

function preloadImages() {
    const preloadContainer = document.createElement('div');
    preloadContainer.id = "preload"
    document.body.append(preloadContainer);
    var img_nb;
    for (img_nb = 0; img_nb < NB_IMG; img_nb++) {
        let link = document.createElement('link');
        let img_nb_str = `${img_nb}`.padStart(5, '0');
        let img_src = `https://cou.cool/2021/dance_images/dance_${img_nb_str}.jpg`;
        link.rel = "prefetch";
        link.as = "image";
        link.href = img_src;
        preloadContainer.append(link);
    }
}

preloadImages();
