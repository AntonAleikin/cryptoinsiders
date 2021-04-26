import jump from 'jump.js';

const mainButtons = () => {

    const mainButtons = document.querySelectorAll('.main-button');
    
    if(mainButtons.length === 0) {
        return;
    }
    
    const diagonalSwipe = button => {
        if(!window.matchMedia("(max-width: 799px)").matches) {
            return;
        }
        button.addEventListener('click', function(e) {
            this.classList.add('diagonal-swipe-activator');
            setTimeout(() =>  this.classList.remove('diagonal-swipe-activator'), 1500);
        });
    };

    const smoothScroll = button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            if(!this.dataset.anchor) {
                return;
            }

            if(window.matchMedia("(max-width: 799px)").matches) {
                setTimeout(() => jump(this.dataset.anchor), 600);
                return;
            }

            jump(this.dataset.anchor);
        });
    };

    mainButtons.forEach(button => {
        diagonalSwipe(button);
        smoothScroll(button);
    });
};

export default mainButtons;