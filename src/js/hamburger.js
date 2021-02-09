import noScroll from '@js/no-scroll';

const hamburger = ({hamburger, menu, close, links}) => 
{
    class HamburgerEvent {
        constructor() {
            this.observers = [];
        }
        subscribe(observer) {
            this.observers.push(observer);
        }
        unsubscribeALL() {
            this.observers = [];
        }
        fire(state) {
            this.observers.forEach(observer => {
                observer.update(state);
            });
        }
    }

    class HamburgerObserver {
        constructor(className) {
            this.className = className;
            this.element = document.querySelector(className);
        }
        update(state) {
            switch(state) {
                case 'ACTIVE':
                    this.element.classList.add(this.className.replace(/[.]/, '') + '_active');
                    noScroll('NOSCROLL');
                    break;
                case 'INACTIVE':
                    this.element.classList.remove(this.className.replace(/[.]/, '') + '_active');
                    noScroll('SCROLL');
            }
        }
    }

    if (window.matchMedia('(max-width: 799px)').matches) 
    {
        const stream$ =  new HamburgerEvent();

        const hamburgerBtn = document.querySelector(hamburger);
        hamburgerBtn.addEventListener('click', () => {
            stream$.subscribe(new HamburgerObserver(hamburger));
            stream$.subscribe(new HamburgerObserver(menu));
            stream$.fire('ACTIVE');
            stream$.unsubscribeALL();
        });
    
        const hamburgerClose = document.querySelector(close);
        hamburgerClose.addEventListener('click', () => {
            stream$.subscribe(new HamburgerObserver(hamburger));
            stream$.subscribe(new HamburgerObserver(menu));
            stream$.fire('INACTIVE');
            stream$.unsubscribeALL();
        });
    
        const menuLinks = document.querySelectorAll(links);
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
    
                noScroll('SCROLL');
                stream$.subscribe(new HamburgerObserver(hamburger));
                stream$.subscribe(new HamburgerObserver(menu));
                stream$.fire('INACTIVE');
                stream$.unsubscribeALL();
                setTimeout(() => {
                    document.location = e.target.href;
                }, 300);
            });
        });
    }
};
export default hamburger;