// Styles
import '@/sass/index.sass';


// JS
import headerShadow from '@js/header';
import smoothScroll from '@js/smooth-scroll';
import navMobile from '@js/nav-mobile';
import dropDown from '@js/dropdown';
import '@js/swiper';

window.addEventListener("DOMContentLoaded", () =>
{
    headerShadow();
    smoothScroll();
    navMobile();
    dropDown('.dropdown');
});