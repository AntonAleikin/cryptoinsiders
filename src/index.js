// Styles
import '@/sass/index.sass';

// JS
import noHover from '@js/no-hover';
import navActive from '@js/nav-active';
import headerShadow from '@js/header';
import smoothScroll from '@js/smooth-scroll';
import hamburger from '@js/hamburger';
import dropDown from '@js/dropdown';
import contactsOverlay from '@js/contacts-overlay';
import '@js/swiper';

window.addEventListener("DOMContentLoaded", () =>
{
    navActive('nav__links-item');
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
    contactsOverlay('contacts-overlay', 'data-contacts-overlay-activator');
});