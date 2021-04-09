const noHover = () => 
{
    if(!window.matchMedia("(max-width: 799px)").matches) {
        return;
    }

    const hoverable = document.querySelectorAll('[class$="-hover"]');

    const removeHover = classList => {
        for(let i = 0; i < classList.length; i++) {
            if(/\-hover$/.test(classList[i])) {
                classList.remove(classList[i]);
                i--;
            }
        }
    };
        
    hoverable.forEach(element => {
        removeHover(element.classList);
    });
};
export default noHover;