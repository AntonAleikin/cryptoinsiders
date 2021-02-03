const dropDown = () => {
    class DropdownEvent {
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
    
    class Dropdown {
        constructor(element) {
            this.parent = element;
            this.main = element.querySelector('.dropdown-main');
            this.wrapper = element.querySelector('.dropdown-wrapper');
            this.activator = element.querySelector('.dropdown-activator');
        } 
    }

    class DropdownParentObserver extends Dropdown{
        update(state) {
            switch(state) {
                case 'ACTIVE':
                    this.parent.classList.add('dropdown_active');
                    break;
                case 'INACTIVE':
                    this.parent.classList.remove('dropdown_active');
            }
        }
    }

    class DropdownWrapperObserver extends Dropdown {
        update(state) {
            switch(state) {
                case 'ACTIVE':
                    this.wrapper.style.transition = 'height 0.6s ease';
                    this.wrapper.style.height = window.getComputedStyle(this.wrapper.firstElementChild).height;
                    break;
                case 'INACTIVE':
                    this.wrapper.style.height = 0;
            }
        }
    }
    
    class DropdownActivatorObserver extends Dropdown {
        update(state) {
            switch(state) {
                case 'ACTIVE':
                    this.activator.classList.add('dropdown-activator_active');
                    break;
                case 'INACTIVE':
                    this.activator.classList.remove('dropdown-activator_active');                      
            }
        }
    }
    
    const stream$ = new DropdownEvent();
    
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        
        const parentObserver = new DropdownParentObserver(dropdown);
        const activatorObserver = new DropdownActivatorObserver(dropdown);
        const wrapperObserver = new DropdownWrapperObserver(dropdown);

        const main = dropdown.querySelector('.dropdown-main');
        const activator = dropdown.querySelector('.dropdown-activator');

        function activate() {
            stream$.subscribe(parentObserver);
            stream$.subscribe(activatorObserver);
            stream$.subscribe(wrapperObserver);
            stream$.fire('ACTIVE');
            stream$.unsubscribeALL();           
            main.removeEventListener('click', activate, {once: true});
            activator.removeEventListener('click', activate, {once: true});
            activator.addEventListener('click', inactivate, {once: true});
        }

        function inactivate() {
            stream$.subscribe(parentObserver);
            stream$.subscribe(activatorObserver);
            stream$.subscribe(wrapperObserver);
            stream$.fire('INACTIVE');
            stream$.unsubscribeALL();
            main.addEventListener('click', activate, {once: true});
            activator.addEventListener('click', activate, {once: true});
        }

        main.addEventListener('click', activate, {once: true});
        activator.addEventListener('click', activate, {once: true});
    });
};
export default dropDown;