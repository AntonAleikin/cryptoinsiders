const navActive = (navLink) => 
{
    class NavLinks {
        constructor(className) {
            this.className = className;
            this.links = document.querySelectorAll('.' + className);
        }
        check() {
            this.links.forEach(link => {
                new NavLink(link, this.className).check();
                new NavLinkBlog(link, this.className).check();
            });
        }
    }

    class NavLink {
        constructor(navLink, className) {
            this.link = navLink;
            this.className = className;
            this.href = this.link.href;
        }
        setActive() {
            this.link.classList.add(this.className + '_active');
        }
        removedHash(href) {
            if(/\/#/.test(href)) {
                return href.split('#')[0];
            }
        }
        check() {
            if(location.href == this.href || this.removedHash(location.href) == this.href) {
                this.setActive();
            }
        }
    }

    class NavLinkBlog extends NavLink{
        isBlog(href) {
            return /\/blog/.test(href);
        }
        check() {
            if(location.href != this.href && this.isBlog(location.href) && this.isBlog(this.href)) {
                this.setActive();
            }
        }
    }

    const navLinks = new NavLinks(navLink);
    navLinks.check();
};
export default navActive;