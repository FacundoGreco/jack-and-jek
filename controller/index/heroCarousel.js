/* GLOBAL VARIABLES */
let carousel;
let heroTranslationX;
let heroCounter;



function translate(side, translationX, carousel, imgWidth) {

    if (side === 'left') {
        carousel.style.transform = 'translateX(' + (translationX + imgWidth) + 'px)';
        translationX += imgWidth;

    } else if (side === 'right') {
        carousel.style.transform = 'translateX(' + (translationX - imgWidth) + 'px)';
        translationX -= imgWidth;
    }

    return translationX;
}

function carouselSwipe(e) {

    const side = e.target.classList.value.slice(6);
    const img = document.querySelector('#heroCarousel img');
    const imgWidth = img.offsetWidth;

    if (side === 'left') {
        heroCounter--;

        if (heroCounter === -1) {
            heroTranslationX = -(imgWidth * 4);
            carousel.style.transform = 'translateX(' + heroTranslationX + 'px)';
            heroCounter = 4;

        } else heroTranslationX = translate(side, heroTranslationX, carousel, imgWidth);

    } else if (side === 'right') {
        heroCounter++;

        if (heroCounter === 5) {
            heroTranslationX = 0;
            carousel.style.transform = 'translateX(' + heroTranslationX + 'px)';
            heroCounter = 0;

        } else heroTranslationX = translate(side, heroTranslationX, carousel, imgWidth);
    }

}


/* ON PAGE OPENED */
function indexMain() {

    //Inicializes variables
    carousel = document.querySelector('#heroCarousel');
    heroTranslationX = 0;
    heroCounter = 0;

    //Starts listeners
    $('.swipe-left').on('click', carouselSwipe);
    $('.swipe-right').on('click', carouselSwipe); //ARREGLAR LISTENER

}
indexMain();

/* ON HASH CHANGE */
window.addEventListener('hashchange', () => {

    const userPath = parseLocation();

    if (userPath === '/index' || userPath === '/') indexMain();

});