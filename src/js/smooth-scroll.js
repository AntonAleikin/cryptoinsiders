const smoothScroll = () => 
{
    function scroll (hash, speed)
    {
        let 
        windowTop = window.scrollY,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;

        requestAnimationFrame(step);

        function step (time)
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
        }
    }

    if (window.matchMedia("(min-width: 800px)").matches) 
    {
        const links = document.querySelectorAll('[href^="#"]');

        if(links) {
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    scroll(this.hash, 0.7);
                });
            });
        }
    }

    if (window.matchMedia("(max-width: 799px)").matches)
    {
        const link = document.querySelector('.hero__button-link');

        if(link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                scroll(this.hash, 0.7);
            });
        }
    }
};
export default smoothScroll;