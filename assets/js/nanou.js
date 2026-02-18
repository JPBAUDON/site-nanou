/**
 * nanou.js — Système d'animations premium
 * Site Massages & Naissance · Nanou Mendels · Bruxelles
 *
 * Stack : GSAP 3.12 + ScrollTrigger
 * Ordre : header → hero → scroll reveals → count-up → mobile menu → page transitions → FAQ
 */

'use strict';

// ─── GSAP Plugin Registration ────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Init on DOM Ready ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initPageTransitions();
  initScrollReveals();
  initCountUp();
  initFaqAccordion();

  // Hero animation only on pages that have a hero (home page)
  if (document.querySelector('.hero-eyebrow')) {
    initHeroAnimation();
  }
});

// ─── 1. HEADER — transparent on hero, opaque when scrolled ───────────────────
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const isHomePage = !!document.querySelector('.hero-section');

  if (isHomePage) {
    // Start transparent so the hero image shows through
    gsap.set(header, { backgroundColor: 'rgba(255,255,255,0)', boxShadow: 'none' });

    ScrollTrigger.create({
      start: 'top -72px',
      onEnter: () => {
        gsap.to(header, {
          backgroundColor: 'rgba(253, 251, 247, 0.97)',
          boxShadow: '0 2px 30px rgba(74, 58, 36, 0.07)',
          duration: 0.45,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          backgroundColor: 'rgba(255,255,255,0)',
          boxShadow: 'none',
          duration: 0.45,
          ease: 'power2.out',
        });
      },
    });
  } else {
    // Inner pages: always opaque
    gsap.set(header, {
      backgroundColor: 'rgba(253, 251, 247, 0.97)',
      boxShadow: '0 2px 20px rgba(74, 58, 36, 0.06)',
    });
  }
}

// ─── 2. HERO ANIMATION — staggered curtain reveal ─────────────────────────────
function initHeroAnimation() {
  const eyebrow  = document.querySelector('.hero-eyebrow');
  const titleWrap = document.querySelector('.hero-title-wrap');
  const title    = document.querySelector('.hero-title');
  const line     = document.querySelector('.hero-line');
  const sub      = document.querySelector('.hero-sub');
  const ctas     = document.querySelector('.hero-ctas');

  if (!title) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .from(eyebrow, {
      opacity: 0,
      y: 18,
      duration: 0.85,
      delay: 0.2,
    })
    .from(title, {
      y: '108%', // slides up from below the clip container
      duration: 1.15,
      ease: 'power4.out',
    }, '-=0.5')
    .to(line, {
      width: '72px',
      duration: 0.85,
      ease: 'power2.out',
    }, '-=0.65')
    .from(sub, {
      opacity: 0,
      y: 14,
      duration: 0.75,
    }, '-=0.5')
    .to(ctas, {
      opacity: 1,
      y: 0,
      duration: 0.65,
    }, '-=0.4');
}

// ─── 3. SCROLL REVEALS — data-attribute driven system ─────────────────────────
function initScrollReveals() {

  // 3a. Individual elements: [data-reveal="up|left|right"]
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const dir   = el.dataset.reveal || 'up';
    const delay = parseFloat(el.dataset.delay) || 0;

    const fromVars = {
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay,
    };

    if (dir === 'up')    fromVars.y = 48;
    if (dir === 'left')  fromVars.x = -48;
    if (dir === 'right') fromVars.x = 48;

    gsap.from(el, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start: 'top 87%',
        once: true,
      },
    });
  });

  // 3b. Staggered children: [data-stagger] on container
  gsap.utils.toArray('[data-stagger]').forEach(container => {
    const children = Array.from(container.children);
    if (!children.length) return;

    gsap.from(children, {
      opacity: 0,
      y: 42,
      duration: 0.85,
      stagger: 0.13,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        once: true,
      },
    });
  });

  // 3c. Section ornament lines: draw in from center
  gsap.utils.toArray('.section-ornament-line').forEach(line => {
    gsap.to(line, {
      scaleX: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // 3d. Parallax backgrounds: [data-parallax] on section
  gsap.utils.toArray('[data-parallax]').forEach(section => {
    const img = section.querySelector('.parallax-img');
    if (!img) return;

    gsap.to(img, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // 3e. Horizontal decorative lines (section separators)
  gsap.utils.toArray('.reveal-line').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

// ─── 4. COUNT-UP ANIMATION ────────────────────────────────────────────────────
function initCountUp() {
  gsap.utils.toArray('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val);
          },
        });
      },
    });
  });
}

// ─── 5. MOBILE MENU — slide-in panel ─────────────────────────────────────────
function initMobileMenu() {
  const openBtn   = document.getElementById('mobile-menu-button');
  const closeBtn  = document.getElementById('mobile-close-btn');
  const panel     = document.getElementById('mobile-panel');
  const overlay   = document.getElementById('mobile-overlay');

  if (!openBtn || !panel || !overlay) return;

  function openMenu() {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ─── 6. PAGE TRANSITIONS — fade out before navigation ────────────────────────
function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Only intercept internal relative links
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('wa.me') ||
      link.hasAttribute('target')
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      const destination = href;

      gsap.to('body', {
        opacity: 0,
        duration: 0.32,
        ease: 'power2.in',
        onComplete() {
          window.location.href = destination;
        },
      });
    });
  });
}

// ─── 7. FAQ ACCORDION — smooth height transition ──────────────────────────────
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    const icon     = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon   = other.querySelector('.faq-icon');
        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.classList.remove('open');
          otherAnswer.style.maxHeight = '0';
          if (otherIcon) otherIcon.classList.remove('rotate');
        }
      });

      // Toggle current
      if (isOpen) {
        answer.classList.remove('open');
        answer.style.maxHeight = '0';
        if (icon) icon.classList.remove('rotate');
      } else {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.classList.add('rotate');
      }
    });
  });
}
