let heroTranslationX = 0;
let heroCounter = 0;
let burgersTranslationX = 0;
let burgersCounter = 0;
let chipsTranslationX = 0;
let chipsCounter = 0;

function carrouselSwipe(side, carrouselId, tag) {

    let carrousel = document.getElementById(carrouselId);
    let img = document.querySelector('#' + carrouselId + ' ' + tag);
    let imgWidth = img.offsetWidth;
    
    carrousel.style.transition = "transform 0.6s ease-in-out";

    if (carrouselId === 'heroCarrousel') {
        if (side === 'left') {
            heroCounter--;

            if (heroCounter === -1) {
                heroTranslationX = -(imgWidth*4);
                carrousel.style.transform = 'translateX(' + heroTranslationX + 'px)';
                heroCounter = 4;

            } else heroTranslationX = translate(side, heroTranslationX, carrousel, imgWidth);

        } else if (side === 'right') {
            heroCounter++;

            if (heroCounter === 5) {
                heroTranslationX = 0;
                carrousel.style.transform = 'translateX(' + heroTranslationX + 'px)';
                heroCounter = 0;

            } else heroTranslationX = translate(side, heroTranslationX, carrousel, imgWidth);
        }

    } else if (carrouselId === 'burgersCarrousel') {
        if (side === 'left') {
            burgersCounter--;

            if (burgersCounter === -1) {
                burgersTranslationX = -(imgWidth*5);
                carrousel.style.transform = 'translateX(' + burgersTranslationX + 'px)';
                burgersCounter = 5;

            } else burgersTranslationX = translate(side, burgersTranslationX, carrousel, imgWidth);

        } else if (side === 'right') {
            burgersCounter++;

            if (burgersCounter === 6) {
                burgersTranslationX = 0;
                carrousel.style.transform = 'translateX(' + burgersTranslationX + 'px)';
                burgersCounter = 0;

            } else burgersTranslationX = translate(side, burgersTranslationX, carrousel, imgWidth);
        }
    } else if (carrouselId === 'chipsCarrousel') {
        if (side === 'left') {
            chipsCounter--;

            if (chipsCounter === -1) {
                chipsTranslationX = -(imgWidth*2);
                carrousel.style.transform = 'translateX(' + chipsTranslationX + 'px)';
                chipsCounter = 2;

            } else chipsTranslationX = translate(side, chipsTranslationX, carrousel, imgWidth);

        } else if (side === 'right') {
            chipsCounter++;

            if (chipsCounter === 3) {
                chipsTranslationX = 0;
                carrousel.style.transform = 'translateX(' + chipsTranslationX + 'px)';
                chipsCounter = 0;

            } else chipsTranslationX = translate(side, chipsTranslationX, carrousel, imgWidth);
        }
    }
}



function translate(side, translationX, carrousel, imgWidth) {
    
    if (side === 'left') {
        carrousel.style.transform = 'translateX(' + (translationX + imgWidth) + 'px)';
        translationX += imgWidth;

    } else if (side === 'right') {
        carrousel.style.transform = 'translateX(' + (translationX - imgWidth) + 'px)';
        translationX -= imgWidth;
    }

    return translationX;
}