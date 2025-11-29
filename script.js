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

    // Date and time picker functionality
    const dateButtons = document.querySelectorAll('.date-option:not(.disabled)');
    const timeButtons = document.querySelectorAll('.time-option:not(.disabled)');
    const dateInput = document.getElementById('preferred-date');
    const timeInput = document.getElementById('preferred-time');

    // Handle date selection
    dateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all date buttons
            dateButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            this.classList.add('selected');
            // Set hidden input value
            if (dateInput && this.dataset.date) {
                dateInput.value = this.dataset.date;
            }
        });
    });

    // Handle time selection
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all time buttons
            timeButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            this.classList.add('selected');
            // Set hidden input value
            if (timeInput && this.dataset.time) {
                timeInput.value = this.dataset.time;
            }
        });
    });
});

