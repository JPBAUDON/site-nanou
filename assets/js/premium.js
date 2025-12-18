// Premium interactions - Level 1.5+
// Enhanced with magnetic buttons, custom cursor, and advanced animations

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// SMOOTH SCROLL - LENIS
// ============================================
let lenis;

if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
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

    // Lenis scroll event for parallax and effects
    lenis.on('scroll', ({ scroll }) => {
        // Parallax hero image (subtle 3% movement)
        const heroImage = document.getElementById('hero-image');
        if (heroImage) {
            const parallaxOffset = scroll * 0.03;
            heroImage.style.transform = `translateY(${parallaxOffset}px)`;
        }

        // Header shadow and blur backdrop enhancement
        const header = document.getElementById('header');
        if (header) {
            if (scroll > 20) {
                header.classList.add('nav-shadow');
                header.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
            } else {
                header.classList.remove('nav-shadow');
                header.style.backgroundColor = 'rgba(250, 248, 245, 0.8)';
            }
        }
    });
} else {
    // Fallback for header effects without Lenis
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('nav-shadow');
            header.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
        } else {
            header.classList.remove('nav-shadow');
            header.style.backgroundColor = 'rgba(250, 248, 245, 0.8)';
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Animate menu icon (hamburger to X)
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenuButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        } else {
            mobileMenuButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
if (!prefersReducedMotion) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
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

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);

        if (target) {
            if (typeof lenis !== 'undefined' && lenis) {
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

// ============================================
// MAGNETIC BUTTONS (Desktop only)
// ============================================
if (!prefersReducedMotion && window.innerWidth > 768) {
    const magneticButtons = document.querySelectorAll('.btn-magnetic, .btn-premium');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Limit movement to 10px
            const moveX = x * 0.3;
            const moveY = y * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// CUSTOM CURSOR (Desktop only)
// ============================================
if (!prefersReducedMotion && window.innerWidth > 768) {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #c87057;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        opacity: 0;
    `;

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid #c87057;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s, width 0.3s, height 0.3s;
        opacity: 0;
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';

        cursor.style.left = `${mouseX - 6}px`;
        cursor.style.top = `${mouseY - 6}px`;
    });

    // Smooth follower with RAF
    function animateFollower() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;

        followerX += dx * 0.1;
        followerY += dy * 0.1;

        cursorFollower.style.left = `${followerX - 20}px`;
        cursorFollower.style.top = `${followerY - 20}px`;

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor states for different elements
    const interactiveElements = document.querySelectorAll('a, button, .card-hover, .card-premium');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = '#7a9a7a'; // sage color
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = '#c87057'; // terra color
        });
    });

    // Hide default cursor on interactive elements
    document.body.style.cursor = 'none';
    interactiveElements.forEach(el => {
        el.style.cursor = 'none';
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #c87057 0%, #d4826f 100%);
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(200, 112, 87, 0.3);
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
function toggleScrollToTop() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
}

window.addEventListener('scroll', toggleScrollToTop);

scrollToTopBtn.addEventListener('click', () => {
    if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Hover effect for scroll to top
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-4px) scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 8px 24px rgba(200, 112, 87, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollToTopBtn.style.boxShadow = '0 4px 16px rgba(200, 112, 87, 0.3)';
});

// ============================================
// IMAGE LAZY LOAD WITH FADE IN
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.transition = 'opacity 0.6s ease-in-out';
                        img.style.opacity = '1';
                    };
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ANIMATE NUMBERS (for stats/prices)
// ============================================
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Observe numbers to animate when visible
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count || el.textContent);
            animateNumber(el, target);
            numberObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-animate-number]').forEach(el => {
    numberObserver.observe(el);
});

// ============================================
// PAGE LOADER
// ============================================
function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-particle"></div>
        <div class="loader-particle"></div>
        <div class="loader-particle"></div>
        <div class="loader-particle"></div>

        <div class="loader-logo">
            <span>M</span>
        </div>

        <div class="loader-progress">
            <div class="loader-progress-bar" id="loader-bar"></div>
        </div>

        <div class="loader-text">Chargement...</div>
    `;

    document.body.appendChild(loader);

    // Simulate loading progress
    const progressBar = document.getElementById('loader-bar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 150);

    // Hide loader when page fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (progressBar) {
                progressBar.style.width = '100%';
            }

            setTimeout(() => {
                loader.classList.add('hidden');

                // Remove loader from DOM after transition
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 600);
            }, 300);
        }, 200);
    });
}

// Only show loader on first visit
if (!sessionStorage.getItem('visited')) {
    sessionStorage.setItem('visited', 'true');
    createPageLoader();
} else {
    // Quick fade in for subsequent page loads
    document.body.style.opacity = '0';
    window.addEventListener('DOMContentLoaded', () => {
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        document.body.style.opacity = '1';
    });
}

// ============================================
// TOAST NOTIFICATION UTILITY
// ============================================
window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success'
        ? '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        : '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

    toast.innerHTML = `
        ${icon}
        <div class="toast-message">${message}</div>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 3000);
};

// ============================================
// FORM ENHANCEMENTS
// ============================================
// Add ripple effect to all buttons
document.querySelectorAll('button, .btn-premium').forEach(btn => {
    if (!btn.classList.contains('ripple')) {
        btn.classList.add('ripple');
    }
});

// Form validation feedback
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#c87057';
                input.style.boxShadow = '0 0 0 3px rgba(200, 112, 87, 0.1)';

                // Reset border on input
                input.addEventListener('input', function resetBorder() {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                    input.removeEventListener('input', resetBorder);
                }, { once: true });
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Veuillez remplir tous les champs requis', 'error');
        }
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            // Log performance (you can send this to analytics)
            console.log(`📊 Page load time: ${pageLoadTime}ms`);

            // Show warning if load time is slow
            if (pageLoadTime > 3000) {
                console.warn('⚠️ Page load time is slow. Consider optimizing images and resources.');
            }
        }, 0);
    });
}

console.log('✨ Premium interactions loaded - Level 1.5+');
