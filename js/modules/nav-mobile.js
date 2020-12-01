function navMobile () 
{
    if (window.matchMedia('(max-width: 767px)').matches)
    {
        const 
        hamburger = document.querySelector('.nav__hamburger'),
        navLinks = document.querySelector('.nav__links'),
        close = navLinks.querySelector('.nav__links-close');

        hamburger.addEventListener("click", () => 
        {
            if (!hamburger.classList.contains('nav__hamburger_active') &&
                !navLinks.classList.contains('nav__links_active'))
            {
                hamburger.classList.add('nav__hamburger_active');
                navLinks.classList.add('nav__links_active');
                document.documentElement.style.overflow = 'hidden';

                close.addEventListener("click", () => 
                {
                    if (hamburger.classList.contains('nav__hamburger_active') &&
                        navLinks.classList.contains('nav__links_active'))
                    {
                        hamburger.classList.remove('nav__hamburger_active');
                        navLinks.classList.remove('nav__links_active');
                        document.documentElement.style.overflow = 'auto';
                    }
                });
            }
            else
            {
                return;
            }
        });

        const links = navLinks.querySelectorAll('.nav__links-item');
        links.forEach((link) => 
        {
            link.addEventListener("click", (e) => 
            {
                e.preventDefault();

                document.documentElement.style.overflow = 'auto';
                hamburger.classList.remove('nav__hamburger_active');
                navLinks.classList.remove('nav__links_active');

                setTimeout(() => {
                    document.location = e.target.href;
                }, 300);
            });
        });
    }
} 
navMobile();