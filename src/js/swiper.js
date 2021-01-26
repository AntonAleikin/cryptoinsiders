import Swiper, {Navigation , Pagination, Lazy} from 'swiper';
Swiper.use([Navigation, Pagination, Lazy]);

const swiper = new Swiper('.swiper-container', {

    slidesPerView: 1,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
    },

    preloadImages: false,
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
    },
});