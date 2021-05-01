let heroTranslationX = 0;
let heroCounter = 0;

function carouselSwipe(side) {

    let carousel = document.getElementById('heroCarousel');
    let img = document.querySelector('#heroCarousel img');
    let imgWidth = img.offsetWidth;
    
    carousel.style.transition = "transform 0.6s ease-in-out";

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