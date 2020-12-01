function headerShadow ()
{
    const header = document.querySelector('.header');

    window.addEventListener("scroll", () => 
    {
        if (window.scrollY >= 30)
        {
            
            if (header.style.boxShadow != '') 
            {
                return;
            }
            else
            {
                header.style.boxShadow = '0 1px 6px -1px black'; 
                header.style.transition = 'box-shadow 0.3s linear';
            }
        }

        if (window.scrollY <= 40 || window.scrollY == 0)
        {
            if (header.style.boxShadow == '') 
            {
                return;
            }
            else
            {
                header.style.boxShadow = '';
            }
        }
    });
}
headerShadow();