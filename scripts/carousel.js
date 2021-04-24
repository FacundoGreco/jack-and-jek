let heroTranslationX = 0;
let heroCounter = 0;
let burgersTranslationX = 0;
let burgersCounter = 0;
let chipsTranslationX = 0;
let chipsCounter = 0;

function carouselSwipe(side, carouselId, tag) {

    let carousel = document.getElementById(carouselId);
    let img = document.querySelector('#' + carouselId + ' ' + tag);
    let imgWidth = img.offsetWidth;
    
    carousel.style.transition = "transform 0.6s ease-in-out";

    if (carouselId === 'heroCarousel') {
        if (side === 'left') {
            heroCounter--;

            if (heroCounter === -1) {
                heroTranslationX = -(imgWidth*4);
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

    } else if (carouselId === 'burgersCarousel') {
        if (side === 'left') {
            burgersCounter--;

            if (burgersCounter === -1) {
                burgersTranslationX = -(imgWidth*5);
                carousel.style.transform = 'translateX(' + burgersTranslationX + 'px)';
                burgersCounter = 5;

            } else burgersTranslationX = translate(side, burgersTranslationX, carousel, imgWidth);

        } else if (side === 'right') {
            burgersCounter++;

            if (burgersCounter === 6) {
                burgersTranslationX = 0;
                carousel.style.transform = 'translateX(' + burgersTranslationX + 'px)';
                burgersCounter = 0;

            } else burgersTranslationX = translate(side, burgersTranslationX, carousel, imgWidth);
        }
    } else if (carouselId === 'chipsCarousel') {
        if (side === 'left') {
            chipsCounter--;

            if (chipsCounter === -1) {
                chipsTranslationX = -(imgWidth*2);
                carousel.style.transform = 'translateX(' + chipsTranslationX + 'px)';
                chipsCounter = 2;

            } else chipsTranslationX = translate(side, chipsTranslationX, carousel, imgWidth);

        } else if (side === 'right') {
            chipsCounter++;

            if (chipsCounter === 3) {
                chipsTranslationX = 0;
                carousel.style.transform = 'translateX(' + chipsTranslationX + 'px)';
                chipsCounter = 0;

            } else chipsTranslationX = translate(side, chipsTranslationX, carousel, imgWidth);
        }
    }
}



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