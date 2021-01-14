// Styles
import '@/sass/index.sass';


// JS
import headerShadow from '@js/header';
import smoothScroll from '@js/smooth-scroll';
import navMobile from '@js/nav-mobile';

window.addEventListener("DOMContentLoaded", () =>
{
    headerShadow();
    smoothScroll();
    navMobile();
});