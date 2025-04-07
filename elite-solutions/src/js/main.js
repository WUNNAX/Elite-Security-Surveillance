/**
 * Elite Solutions - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Country notification close
    const notification = document.querySelector('.country-notification');
    const closeNotificationBtn = document.querySelector('.close-notification');

    if (closeNotificationBtn && notification) {
        closeNotificationBtn.addEventListener('click', function() {
            notification.style.display = 'none';
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';

    const header = document.querySelector('.main-header .container');
    const nav = document.querySelector('.main-navigation');

    if (header && nav) {
        header.insertBefore(mobileMenuToggle, nav);

        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Carousel navigation
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselItems.length && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Show the current slide
        function showSlide(index) {
            // Hide all slides
            carouselItems.forEach(item => {
                item.classList.remove('active');
            });

            // Show the current slide
            carouselItems[index].classList.add('active');
        }

        // Previous slide
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = carouselItems.length - 1;
            }
            showSlide(currentIndex);
        });

        // Next slide
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= carouselItems.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        });

        // Auto-rotate carousel
        let carouselInterval = setInterval(function() {
            currentIndex++;
            if (currentIndex >= carouselItems.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        }, 5000);

        // Pause auto-rotation on hover
        const carousel = document.querySelector('.automation-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });

            carousel.addEventListener('mouseleave', function() {
                carouselInterval = setInterval(function() {
                    currentIndex++;
                    if (currentIndex >= carouselItems.length) {
                        currentIndex = 0;
                    }
                    showSlide(currentIndex);
                }, 5000);
            });
        }
    }

    // Submenu toggle for mobile
    const menuItemsWithSubmenu = document.querySelectorAll('.has-submenu');

    if (menuItemsWithSubmenu.length) {
        function toggleSubmenu(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = this.querySelector('.submenu');
                if (submenu) {
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        submenu.style.display = 'block';
                    }
                }
            }
        }

        menuItemsWithSubmenu.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', toggleSubmenu);
            }
        });
    }

    // Add active class for current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath) && linkPath !== '#') {
            link.parentElement.classList.add('current-page');
        }
    });
});
