const smoothScroll = () => 
{
    const scroll = (hash, speed) =>
    {
        let 
        windowTop = window.scrollY,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;

        const step = (time) =>
        {
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

            if (r != windowTop + toBlock)
            {
                requestAnimationFrame(step);
            }
            else
            {
                location.hash = hash;
            }
        };

        requestAnimationFrame(step);
    };

    const anableScroll = (links, speed) => {
        if(!links) {
            return;
        }

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                scroll(this.hash, speed);
            });
        });
    };

    const links = document.querySelectorAll('[href^="#"]');
    anableScroll(links, 0.7);
};
export default smoothScroll;