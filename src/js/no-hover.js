const noHover = () => 
{
    if(window.matchMedia("(max-width: 799px)").matches) {

        const hoverable = document.querySelectorAll('[class$="-hover"]');
        
        hoverable.forEach(element => {
            element.classList.forEach(className => {
                if(/\-hover$/.test(className)) {
                    element.classList.remove(className);
                } 
            });
        });
    }
};
export default noHover;