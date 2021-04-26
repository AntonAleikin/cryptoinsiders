import jump from 'jump.js';

const smoothScroll = () => {

    const anchorScroll = (link, { speed, offset }) => {

        const options = type => {
            switch(type) {
                case 'mobile': 
                    return {
                        duration: speed,
                        offset: - offset.mobile,
                    };
                case 'standard':
                    return {
                        duration: speed,
                        offset: - offset.standard,
                    };
            }
        };

        link.addEventListener('click', function(e) {
            e.preventDefault();

            if(window.matchMedia("(max-width: 799px)").matches) {
                jump(this.hash, options('mobile'));
                return;
            }
    
            jump(this.hash, options('standard'));
        });
    };

    const links = document.querySelectorAll('[href^="#"]');
    const options = {
        duration: 700,
        offset: {
            standard: 115,
            mobile: 95,
        }
    };
    links.forEach(link => anchorScroll(link, options));
};
export default smoothScroll;


/* const scroll = (hash, speed, offset) => {
    let 
    windowTop = window.scrollY,
    toBlock = document.querySelector(hash).getBoundingClientRect().top - offset,
    start = null;

    const step = (time) => {
        if (start === null)
        {
            start = time;
        }

        let 
        progress = time - start,
        // Узнаем, в какую сторону листать
        r = (toBlock < 0 ? Math.max(windowTop - progress / speed, windowTop + toBlock) : 
            Math.min(windowTop + progress / speed, windowTop + toBlock));

        window.scrollTo(0, r);

        if (r != windowTop + toBlock) {
            requestAnimationFrame(step);
        } else {
            location.hash = hash;
        }
    };

    requestAnimationFrame(step);
}; */