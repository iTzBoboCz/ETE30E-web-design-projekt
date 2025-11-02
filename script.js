// Mobile Navigation Burger Menu
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNav = document.getElementById('mainNav');

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', function() {
            const isActive = burgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        const nav = document.querySelector('nav');
        if (nav) {
            document.addEventListener('click', function(event) {
                const isClickInsideNav = nav.contains(event.target);
                const isClickOnBurger = burgerMenu.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnBurger && mainNav.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }

        // Handle window resize - close menu on desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 769) {
                    burgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 250);
        });
    }
});

