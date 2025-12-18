// Premium interactions - Level 1.5

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize Lenis Smooth Scroll (only if user doesn't prefer reduced motion)
if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Lenis scroll event for parallax
    lenis.on('scroll', ({ scroll }) => {
        // Parallax hero image (subtle 3% movement)
        const heroImage = document.getElementById('hero-image');
        if (heroImage) {
            const parallaxOffset = scroll * 0.03;
            heroImage.style.transform = `translateY(${parallaxOffset}px)`;
        }

        // Header shadow
        const header = document.getElementById('header');
        if (scroll > 20) {
            header.classList.add('nav-shadow');
        } else {
            header.classList.remove('nav-shadow');
        }
    });
} else {
    // Fallback for header shadow without Lenis
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('nav-shadow');
        } else {
            header.classList.remove('nav-shadow');
        }
    });
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Intersection Observer for reveal animations
if (!prefersReducedMotion) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
} else {
    // If reduced motion, show all elements immediately
    document.querySelectorAll('.reveal').forEach(element => {
        element.classList.add('active');
    });
}

// Smooth scroll for anchor links (works with Lenis)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            if (typeof lenis !== 'undefined') {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.5
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
