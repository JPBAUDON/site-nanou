/**
 * nanou.js — Système d'animations ultra-premium
 * Site Massages & Naissance · Nanou Mendels · Bruxelles
 *
 * Concept : "Le Toucher Comme Langage"
 * Chaque interaction visuelle mime une sensation de toucher —
 * chaleur, profondeur, présence, rythme respiratoire.
 *
 * Stack : GSAP 3.12 + ScrollTrigger + Lenis + SplitType
 * Ordre : grain → lenis → cursor → curtain → header → menu →
 *         hero → splitText → sectionSequences → countUp →
 *         card3DTilt → magneticButtons → marquee → faq
 */

'use strict';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Remplacer par l'URL Calendly réelle de Nanou dès qu'elle est disponible
const CALENDLY_URL = 'https://calendly.com/NANOU_CALENDLY_URL';

// ─── GSAP Plugin Registration ─────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Init on DOM Ready ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGrain();
  initLenis();
  initCursor();
  initPageCurtain();
  initHeader();
  initMobileMenu();

  if (document.querySelector('.hero-eyebrow')) {
    initHeroAnimation();
  }

  initSplitTextReveals();
  initSectionSequences();
  initCountUp();
  initCard3DTilt();
  initMagneticButtons();
  initMarqueeTestimonials();
  initFaqAccordion();
  initCalendlyTriggers();
  initStickyBooking();

  // Print button
  const printBtn = document.getElementById('print-btn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // Google reviews hover
  const reviewsBtn = document.getElementById('google-reviews-btn');
  if (reviewsBtn) {
    reviewsBtn.addEventListener('mouseover', () => { reviewsBtn.style.transform = 'translateY(-2px)'; });
    reviewsBtn.addEventListener('mouseout',  () => { reviewsBtn.style.transform = ''; });
  }
});

// ─── 1. GRAIN ORGANIQUE ───────────────────────────────────────────────────────
// Texture tactile animée — évoque le toucher, le textile, la peau
function initGrain() {
  const grain = document.createElement('div');
  grain.className = 'grain-overlay';
  grain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(grain);
}

// ─── 2. LENIS SMOOTH SCROLL ───────────────────────────────────────────────────
// Scroll à inertie — transforme radicalement la sensation de navigation
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.4,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Synchronisation avec le ticker GSAP pour ScrollTrigger parfait
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  window._lenis = lenis;
}

// ─── 3. CURSEUR AURA CUIVRÉE ─────────────────────────────────────────────────
// Orbe cuivré qui suit le curseur avec inertie — trace de chaleur visible
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  // Dot — point de précision (suit exactement, aucun lag)
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);

  // Aura — orbe d'inertie (suit avec lerp)
  const aura = document.createElement('div');
  aura.className = 'cursor-aura';
  aura.setAttribute('aria-hidden', 'true');
  document.body.appendChild(aura);

  let cx = -100, cy = -100;
  let mx = -100, my = -100;
  let visible = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Dot suit EXACTEMENT — centré sur le pixel cliqué
    dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    if (!visible) {
      dot.style.opacity = '1';
      aura.style.opacity = '1';
      visible = true;
    }
  });

  // RAF loop avec lerp — l'aura suit avec inertie cuivrée (dirty flag: pause quand souris immobile)
  let dirty = false;
  document.addEventListener('mousemove', () => { dirty = true; }, { passive: true });

  const tick = () => {
    if (dirty) {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      aura.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
      // Marquer comme settled si l'aura est proche de la souris
      if (Math.abs(cx - mx) < 0.1 && Math.abs(cy - my) < 0.1) dirty = false;
    }
    requestAnimationFrame(tick);
  };
  tick();

  // États selon l'élément survolé
  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.tagName === 'IMG' || t.closest('.card-image')) {
      dot.className   = 'cursor-dot is-hovering-img';
      aura.className  = 'cursor-aura is-hovering-img';
    } else if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a, button')) {
      dot.className   = 'cursor-dot is-hovering-btn';
      aura.className  = 'cursor-aura is-hovering-btn';
    } else {
      dot.className   = 'cursor-dot';
      aura.className  = 'cursor-aura';
    }
  });

  const hide = () => { dot.style.opacity = '0'; aura.style.opacity = '0'; visible = false; };
  const show = () => { dot.style.opacity = '1'; aura.style.opacity = '1'; visible = true; };
  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);
}

// ─── 4. RIDEAU DE PAGE CUIVRÉ ─────────────────────────────────────────────────
// Voile cuivré qui s'ouvre uniquement à la navigation (exit) — entrée sans rideau
// Note : le rideau reste hors-écran (translateX 100%) par défaut (CSS)
// pour éviter tout risque de blocage de la page au chargement.
function initPageCurtain() {
  const curtain = document.createElement('div');
  curtain.className = 'page-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(curtain);

  // Intercepter les liens internes uniquement (exit animation)
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.includes('wa.me') ||
      link.hasAttribute('target')
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      const destination = href;
      // Rideau entre depuis la droite, couvre l'écran, puis navigue
      gsap.fromTo(curtain,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete() { window.location.href = destination; },
        }
      );
    });
  });
}

// ─── 5. HEADER — Le Cadre : ligne animée + transparent hero / opaque scroll ───
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const frameLine = header.querySelector('.header-frame-top');
  const isHomePage = !!document.querySelector('.hero-section');

  // Animation signature : la ligne supérieure s'ouvre du centre vers les bords
  if (frameLine) {
    gsap.from(frameLine, {
      scaleX: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.4,
    });
  }

  // Helpers — applique les styles inline (inline > toute règle CSS)
  const applyOpaque = () => {
    header.style.background = 'rgba(255, 255, 255, 0.65)';
    header.style.backdropFilter = 'blur(32px) saturate(200%)';
    header.style.webkitBackdropFilter = 'blur(32px) saturate(200%)';
    header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.50)';
  };

  const applyTransparent = () => {
    header.style.background = 'transparent';
    header.style.backdropFilter = 'none';
    header.style.webkitBackdropFilter = 'none';
    header.style.boxShadow = 'none';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
  };

  // État initial
  if (isHomePage) {
    applyTransparent();
  } else {
    applyOpaque();
  }

  // Suivi de direction du scroll
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY;
    const pastHero = currentY > 80;
    const showOpaque = pastHero || !isHomePage;

    if (showOpaque) {
      applyOpaque();
      header.classList.remove('hero-top');
      header.classList.add('scrolled');
      if (scrollingDown && pastHero) {
        header.classList.add('compact');
      } else {
        header.classList.remove('compact');
      }
    } else {
      applyTransparent();
      header.classList.add('hero-top');
      header.classList.remove('scrolled', 'compact');
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Appel immédiat au chargement — si la page est déjà scrollée, appliquer l'état correct
  updateHeader();
}

// ─── 6. MOBILE MENU — panneau slide-in ───────────────────────────────────────
function initMobileMenu() {
  const openBtn  = document.getElementById('mobile-menu-button');
  const closeBtn = document.getElementById('mobile-close-btn');
  const panel    = document.getElementById('mobile-panel');
  const overlay  = document.getElementById('mobile-overlay');

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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ─── 7. HERO ANIMATION + RESPIRATION ─────────────────────────────────────────
// Timeline staggerée 5 éléments + micro-respiration du fond (cycle de 8s)
function initHeroAnimation() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const title   = document.querySelector('.hero-title');
  const line    = document.querySelector('.hero-line');
  const sub     = document.querySelector('.hero-sub');
  const ctas    = document.querySelector('.hero-ctas');

  if (!title) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .from(eyebrow, { opacity: 0, y: 18, duration: 0.85, delay: 0.3 })
    .from(title,   { y: '108%', duration: 1.15, ease: 'power4.out' }, '-=0.5')
    .to(line,      { width: '72px', duration: 0.85, ease: 'power2.out' }, '-=0.65')
    .from(sub,     { opacity: 0, y: 14, duration: 0.75 }, '-=0.5')
    .to(ctas,      { opacity: 1, y: 0, duration: 0.65 }, '-=0.4');

  // Respiration — micro-scale qui donne vie à la photographie
  gsap.to('.hero-bg', {
    scale: 1.085,
    duration: 8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 2.5,
  });
}

// ─── 8. SPLIT TEXT REVEALS — ligne par ligne ──────────────────────────────────
// SplitType découpe les titres en lignes — chaque ligne glisse depuis le bas
// comme si les mots montaient à la surface de l'eau
function initSplitTextReveals() {
  if (typeof SplitType === 'undefined') return;

  const headings = document.querySelectorAll('section h2, main h1');

  headings.forEach(el => {
    if (el.classList.contains('hero-title')) return;

    let split;
    try {
      split = new SplitType(el, { types: 'lines' });
    } catch(e) { return; }

    if (!split.lines || !split.lines.length) return;

    // Wrapper overflow:hidden — effet rideau de scène
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'split-line-parent';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      y: '110%',
      opacity: 0,
      duration: 1.1,
      stagger: 0.13,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

// ─── 9. SECTION SEQUENCES — séquençage strict ────────────────────────────────
// Numéros fantômes + clip-path images + stagger 3D + blur reveal
// Chaque section se dévoile dans un ordre narratif précis
function initSectionSequences() {

  // 9a. Numéros fantômes — grands chiffres Cormorant en arrière-plan
  // Parallaxent plus lentement que le contenu → sensation de profondeur
  document.querySelectorAll('[data-section-number]').forEach(section => {
    const num = document.createElement('span');
    num.className = 'section-ghost-number';
    num.textContent = section.dataset.sectionNumber;
    num.setAttribute('aria-hidden', 'true');

    if (getComputedStyle(section).position === 'static') {
      section.style.position = 'relative';
    }
    section.style.overflow = 'hidden';
    section.appendChild(num);

    // Parallax lent (0.3× vitesse scroll) — effet de profondeur layerée
    gsap.to(num, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Apparition douce
    gsap.fromTo(num,
      { opacity: 0 },
      {
        opacity: 0.045,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      }
    );
  });

  // 9b. Clip-path reveal — les images sont dévoilées de gauche à droite
  // Comme retirer un papier calque d'une photographie
  gsap.utils.toArray('.card-image').forEach(container => {
    gsap.fromTo(container,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.3,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // 9c. Stagger renforcé avec perspective 3D — les éléments basculent à l'entrée
  gsap.utils.toArray('[data-stagger]').forEach(container => {
    const children = Array.from(container.children);
    if (!children.length) return;

    gsap.from(children, {
      opacity: 0,
      y: 56,
      rotateX: 6,
      transformPerspective: 900,
      duration: 1.0,
      stagger: 0.22,
      ease: 'power3.out',
      clearProps: 'rotateX,transformPerspective',
      scrollTrigger: { trigger: container, start: 'top 82%', once: true },
    });
  });

  // 9d. data-reveal avec blur — mise au point progressive (flou → net)
  // Comme regarder quelque chose s'approcher lentement
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const dir   = el.dataset.reveal || 'up';
    const delay = parseFloat(el.dataset.delay) || 0;

    const fromVars = {
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      delay,
      filter: 'blur(8px)',
    };

    if (dir === 'up')    fromVars.y = 48;
    if (dir === 'left')  fromVars.x = -48;
    if (dir === 'right') fromVars.x = 48;

    gsap.from(el, {
      ...fromVars,
      clearProps: 'filter',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
    });
  });

  // 9e. Lignes ornementales — se dessinent depuis le centre
  gsap.utils.toArray('.section-ornament-line').forEach(line => {
    gsap.to(line, {
      scaleX: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: line, start: 'top 88%', once: true },
    });
  });

  // 9f. Separateurs — se dessinent de gauche à droite
  gsap.utils.toArray('.reveal-line').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // 9g. Parallax backgrounds — [data-parallax]
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
}

// ─── 10. COUNT-UP ─────────────────────────────────────────────────────────────
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
          onUpdate() { el.textContent = Math.round(obj.val); },
        });
      },
    });
  });
}

// ─── 11. CARD 3D TILT — perspective magnétique ────────────────────────────────
// Les cartes s'inclinent selon la position du curseur
// Évoque la pression du toucher — légère résistance physique
function initCard3DTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.service-card').forEach(card => {
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left)  / rect.width  - 0.5;
      const y = (e.clientY - rect.top)   / rect.height - 0.5;

      gsap.to(card, {
        rotateX: -y * 8,
        rotateY:  x * 8,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'rotateX,rotateY,transformPerspective',
      });
    });
  });
}

// ─── 12. MAGNETIC BUTTONS — attraction cuivrée ───────────────────────────────
// Les boutons se déplacent légèrement vers le curseur dans leur zone
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left  - rect.width  / 2) * 0.25;
      const y = (e.clientY - rect.top   - rect.height / 2) * 0.25;
      gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ─── 13. MARQUEE TESTIMONIALS — défilement infini ────────────────────────────
// Les témoignages défilent en boucle — flux continu de présences, de voix
function initMarqueeTestimonials() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const items = Array.from(track.children);
  if (!items.length) return;

  // Dupliquer pour un loop seamless
  items.forEach(item => track.appendChild(item.cloneNode(true)));

  // CSS gère l'animation (marquee-left keyframe)
  // JS gère pause/reprise au hover
  const wrapper = track.closest('.marquee-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    wrapper.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
}

// ─── 15. CALENDLY TRIGGERS — Gestion des CTAs de réservation ──────────────
function initCalendlyTriggers() {
  document.querySelectorAll('.calendly-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = btn.dataset.calendlyUrl;
      if (typeof Calendly !== 'undefined' && url && !url.includes('NANOU_CALENDLY_URL')) {
        Calendly.initPopupWidget({ url });
      } else {
        // Fallback : naviguer vers le formulaire de contact si Calendly n'est pas configuré
        window.location.href = 'contact.html#contact-form';
      }
    });
  });
}

// ─── 16. STICKY BOOKING BUTTON — Apparaît après 400px de scroll ──────────
function initStickyBooking() {
  // Ne pas afficher sur les pages légales
  const legalPages = ['mentions-legales.html', 'confidentialite.html'];
  if (legalPages.some(p => window.location.pathname.includes(p))) return;

  const btn = document.createElement('a');
  btn.className = 'sticky-book-btn btn-primary calendly-trigger';
  btn.setAttribute('href', '#');
  btn.setAttribute('data-calendly-url', CALENDLY_URL);
  btn.innerHTML = '<i class="ph-thin ph-calendar-blank" style="margin-right:0.4rem; vertical-align:middle;"></i><span data-i18n="cta.book">Réserver</span>';
  btn.setAttribute('aria-label', 'Prendre rendez-vous');
  document.body.appendChild(btn);

  ScrollTrigger.create({
    start: 400,
    onEnter: () => btn.classList.add('visible'),
    onLeaveBack: () => btn.classList.remove('visible'),
  });
}

// ─── 14. FAQ ACCORDION — transition fluide ───────────────────────────────────
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item, i) => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    const icon     = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    // ARIA setup
    const panelId = `faq-panel-${i}`;
    answer.setAttribute('id', panelId);
    answer.setAttribute('role', 'region');
    question.setAttribute('aria-controls', panelId);
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      faqItems.forEach(other => {
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon   = other.querySelector('.faq-icon');
        const otherQ      = other.querySelector('.faq-question');
        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.classList.remove('open');
          otherAnswer.style.maxHeight = '0';
          if (otherIcon) otherIcon.classList.remove('rotate');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        answer.classList.remove('open');
        answer.style.maxHeight = '0';
        if (icon) icon.classList.remove('rotate');
        question.setAttribute('aria-expanded', 'false');
      } else {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.classList.add('rotate');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
