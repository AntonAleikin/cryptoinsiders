const dropDown = (initialElement) => 
{
    function getActivator() {
        return initialElement + '-activator';
    }

    function getWrapper() {
        return initialElement + '-wrapper';
    }

    function getElements(string) {
        return document.querySelectorAll(string);
    }

    function getClassName(className) {
        return className.replace(/[.]/, '');
    }

    function activeClassName(className) {
        return className.replace(/[.]/, '') + '_active';
    }

    function getHeight(element) {
        return window.getComputedStyle(element).height;
    }

    getElements(initialElement).forEach((item, index) => {
        item.dataset.dropDownId = index;
    });

    getElements(getActivator()).forEach((item, index) => {
        item.dataset.dropDownId = index;
    });

    getElements(getWrapper()).forEach((item, index) => {
        item.dataset.dropDownId = index;
    });

    // Добавляем Hover, который меняет фон активатору
    if(window.matchMedia('(min-width: 800px)').matches) {

        getElements(getActivator()).forEach(activator => {
            activator.addEventListener('mouseenter', () => {

                getElements(`[data-drop-down-id="${activator.dataset.dropDownId}"]`).forEach(dropdown => {
                    if(
                        dropdown.classList.contains(getClassName(initialElement)) && 
                        !dropdown.classList.contains(activeClassName(initialElement))
                    ) {
                        dropdown.style.transition = 'background-color 0.6s ease';
                        dropdown.style.backgroundColor = '#212228';
                    }                  
                });
            });
            activator.addEventListener('mouseleave', () => {

                getElements(`[data-drop-down-id="${activator.dataset.dropDownId}"]`).forEach(dropdown => {
                    if(
                        dropdown.classList.contains(getClassName(initialElement)) && 
                        !dropdown.classList.contains(activeClassName(initialElement))
                    ) {
                        dropdown.style.transition = 'background-color 0.6s ease';
                        dropdown.style.backgroundColor = '#1a1b20';
                    }                  
                });
            });
        });
    }

    getElements(getActivator()).forEach(activator => {

        activator.addEventListener('click', () => {

            if(!activator.classList.contains(activeClassName(getActivator()))) {
                activator.style.transition = 'background-color 0.6s ease';
                activator.style.backgroundColor = 'white';
                activator.classList.add(activeClassName(getActivator()));
            } 
            else if(activator.classList.contains(activeClassName(getActivator()))) {
                activator.style.backgroundColor = '#F8B62A';
                activator.classList.remove(activeClassName(getActivator()));
            }

            getElements(`[data-drop-down-id="${activator.dataset.dropDownId}"]`).forEach(wrapper => {  
                if(
                    wrapper.classList.contains(getClassName(getWrapper())) &&
                    !wrapper.classList.contains(activeClassName(getWrapper()))
                ) {
                    wrapper.style.transition = 'height 0.6s ease';
                    wrapper.style.height = getHeight(wrapper.firstElementChild);
                    wrapper.classList.add(activeClassName(getWrapper()));
                } 
                else if(
                    wrapper.classList.contains(getClassName(getWrapper())) &&
                    wrapper.classList.contains(activeClassName(getWrapper()))
                ) {
                    wrapper.style.height = '0px';
                    wrapper.classList.remove(activeClassName(getWrapper()));
                }
            });
            
            getElements(`[data-drop-down-id="${activator.dataset.dropDownId}"]`).forEach(dropdown => {
                if(
                    dropdown.classList.contains(getClassName(initialElement)) && 
                    !dropdown.classList.contains(activeClassName(initialElement))
                ) {
                    dropdown.style.transition = 'background-color 0.6s ease';
                    dropdown.style.backgroundColor = '#212228';
                    dropdown.classList.add(activeClassName(initialElement));
                }
                else if(
                    dropdown.classList.contains(getClassName(initialElement)) &&
                    dropdown.classList.contains(activeClassName(initialElement))
                ) {
                    dropdown.style.backgroundColor = '#1a1b20';
                    dropdown.classList.remove(activeClassName(initialElement));
                }
            });
        });
    });
};
export default dropDown;