function changeIcons () {

    const socialBar = document.querySelector('.social-bar'),
    socialBarImg = socialBar.querySelectorAll('.social-bar__link-img');

    if (window.matchMedia("(min-width: 768px)").matches) {

        window.addEventListener("scroll", () => {
            
            if (window.scrollY >= window.innerHeight*0.72 && window.scrollY <= window.innerHeight*1.72 ||
                window.scrollY >= window.innerHeight*2.72 && window.scrollY <= window.innerHeight*3.72 ||
                window.scrollY >= window.innerHeight*4.72 && window.scrollY <= window.innerHeight*5.72) {

                if (socialBar.classList.contains('social-bar_dark')) {
                    return;
                } else {
                    socialBar.classList.add('social-bar_dark');
                    socialBarImg.forEach((img) => {
                        img.src = img.src.replace(/.svg/, '_black.svg');
                    });
                    return;
                }

            } else {

                if (!socialBar.classList.contains('social-bar_dark')) {
                    return;
                } else {
                    socialBar.classList.remove('social-bar_dark');
                    socialBarImg.forEach((img) => {
                        img.src = img.src.replace(/_black.svg/, '.svg');
                    });
                }
            }  
        });
    }
    else
    {
        socialBar.style.display = 'none';
    }
}
changeIcons();