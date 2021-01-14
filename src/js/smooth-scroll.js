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

    if (window.matchMedia("(min-width: 768px)").matches)
    {
        const links = document.querySelectorAll('[href^="#"]');
    
        links.forEach(link =>
        {
            link.addEventListener("click", function(e) 
            {
                e.preventDefault();
    
                scroll(this.hash, 0.6);
            });
        });
    }

    if (window.matchMedia("(max-width: 575px)").matches)
    {
        const link = document.querySelector('.home-section__button-link');

        link.addEventListener("click", function (e) 
        {
            e.preventDefault();
            scroll(this.hash, 0.6);
        });
    }
};
export default smoothScroll;