import noScroll from '@js/no-scroll';

const contactsOverlay = (overlayClassName, dataActivators) => 
{
    class OverlayEvent {
        constructor() {
            this.observers = [];
        }
        subscribe(observer) {
            this.observers.push(observer);
        }
        unsubscribeAll() {
            this.observers = [];
        }
        fire(state) {
            this.observers.forEach(observer => {
                observer.update(state);
            });
        }
    }

    class Overlay {
        constructor(className) {
            this.className = className;
            this.overlay = document.querySelector('.' + this.className);
        }
        getDeactivator() {
            return this.overlay.querySelector('.' + this.className + '__close');
        }
    }

    class OverlayObserver extends Overlay{
        update(state) {
            switch(state) {
                case 'ACTIVE': 
                    this.overlay.classList.add(this.className + '_active');
                    noScroll('NOSCROLL');
                    break;
                case 'INACTIVE': 
                    this.overlay.classList.remove(this.className + '_active');
                    noScroll('SCROLL');
            }
        }
    }

    const stream$ = new OverlayEvent();

    const activators = document.querySelectorAll(`[${dataActivators}]`);
 
    activators.forEach(activator => {

        const overlayObserver = new OverlayObserver(overlayClassName);
        const deactivator = overlayObserver.getDeactivator();

        function activate() {
            stream$.subscribe(overlayObserver);
            stream$.fire('ACTIVE');
            stream$.unsubscribeAll();
            deactivator.addEventListener('click', inactivate, {once: true});
        }

        function inactivate() {
            stream$.subscribe(overlayObserver);
            stream$.fire('INACTIVE');
            stream$.unsubscribeAll();
            activator.addEventListener('click', activate, {once: true});
        }

        activator.addEventListener('click', activate, {once: true});
    });
};
export default contactsOverlay;