// Styles
import '@/sass/index.sass';

// JS
import noHover from '@js/no-hover';
import headerShadow from '@js/header';
import mainButtons from '@js/main-buttons';
import smoothScroll from '@js/smooth-scroll';
import hamburger from '@js/hamburger';
import dropDown from '@js/dropdown';
import contactsOverlay from '@js/contacts-overlay';
import lazyLoad from '@js/lazy-load';
import postCardsLoader from '@js/post-cards-load';
import '@js/swiper';
import 'fslightbox';

window.addEventListener("DOMContentLoaded", () =>
{
    noHover();
    headerShadow();
    mainButtons();
    smoothScroll(); 
    hamburger({
        hamburger: '.nav__hamburger',
        menu: '.nav__links',
        close: '.nav__links-close',
        links: '.nav__links-item',
    });
    dropDown();
    contactsOverlay('contacts-overlay', 'data-contacts-overlay-activator');
    lazyLoad(['[data-post-media-src]']);
    postCardsLoader('#post-cards-load-activator', '#post-cards-container');
});