// Styles
import '@/sass/index.sass';

// JS
import noHover from '@js/no-hover';
import headerShadow from '@js/header';
import smoothScroll from '@js/smooth-scroll';
import hamburger from '@js/hamburger';
import dropDown from '@js/dropdown';
import '@js/swiper';

window.addEventListener("DOMContentLoaded", () =>
{
    noHover();
    headerShadow();
    smoothScroll(); 
    hamburger({
        hamburger: '.nav__hamburger',
        menu: '.nav__links',
        close: '.nav__links-close',
        links: '.nav__links-item',
    });
    dropDown();
});