const lazyLoad = () => {

    // Мб сделать гибким и принимать массив атрибутов на вход?
    const postMedia = document.querySelectorAll('[data-post-media-src]');
    console.log(postMedia);
};

export default lazyLoad;