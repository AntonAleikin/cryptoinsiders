const mainButtons = () => {

    const mainButtons = document.querySelectorAll('.main-button');
    
    if(mainButtons.length === 0) {
        return;
    }
    
    const diagonalSwipe = button => {
        button.addEventListener('click', function(e) {
            this.classList.add('diagonal-swipe-activator');
            setTimeout(() =>  this.classList.remove('diagonal-swipe-activator'), 1500);
        });
    };

    if(window.matchMedia("(max-width: 799px)").matches) {
        mainButtons.forEach(button => diagonalSwipe(button));
    }
};

export default mainButtons;