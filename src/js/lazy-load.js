const lazyLoad = (attributes = []) => {

    if(attributes.length === 0) {
        return;
    }

    const getElemets = attributes => {
        let elements = [];

        attributes.forEach(attribute => {
            const elementsPart = document.querySelectorAll(attribute);
            elements = [...elements, ...elementsPart];
        });

        return elements;
    };

    const setSrc = element => {
        element.src = element.dataset.postMediaSrc;
    };

    const elements = getElemets(attributes);
    
    elements.forEach(element => setSrc(element));
};

export default lazyLoad;