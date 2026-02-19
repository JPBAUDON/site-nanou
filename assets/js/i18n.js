/**
 * i18n.js — Système de traduction FR / NL / EN
 * Site Massages & Naissance · Nanou Mendels · Bruxelles
 *
 * Utilisation :
 *   - Ajouter data-i18n="clé.sous-clé" sur les éléments HTML
 *   - Ajouter data-i18n-placeholder="clé" sur les inputs
 *   - Le switcher .lang-btn[data-lang] déclenche le changement
 *   - Langue détectée automatiquement depuis navigator.language
 *   - Préférence sauvegardée dans localStorage (clé: 'nanou-lang')
 */

'use strict';

const TRANSLATIONS = {

  /* ══════════════════════════════════════════════════════════════════
     FRANÇAIS — Langue source
  ══════════════════════════════════════════════════════════════════ */
  fr: {
    nav: {
      brand:       'Massages & Naissance',
      name:        'Nanou Mendels',
      accueil:     'Accueil',
      prestations: 'Prestations',
      apropos:     'À propos',
      tarifs:      'Tarifs',
      contact:     'Contact',
      reserver:    'Réserver',
    },
    cta: {
      book:       'Prendre rendez-vous',
      learn_more: 'En savoir plus',
    },
    footer: {
      copyright: '© 2025 Massages & Naissance — Tous droits réservés',
      legal:     'Mentions légales',
      privacy:   'Politique de confidentialité',
    },
    hero: {
      eyebrow:   'Bruxelles · Bien-être',
      title:     'Bienvenue dans votre espace de bien-être',
      sub:       'Massage · Haptonomie · Thérapie psycho-corporelle',
      discover:  'Découvrir',
      scroll:    'Défiler',
    },
    intro: {
      ornament: "L'approche",
      quote:    'Avant même de naître, le toucher est notre première connexion au monde.',
    },
    services: {
      ornament: 'Mes Prestations',
      title:    'Un accompagnement sur-mesure',
      sub:      'Chaque séance est pensée pour répondre à vos besoins spécifiques.',
      all_cta:  'Voir toutes les prestations',
      s1: { tag: 'Bien-être', title: 'Massage & Relaxation', sub: 'Détente profonde et relâchement des tensions.', cta: 'En savoir plus' },
      s2: { tag: 'Périnatal', title: 'Haptonomie', sub: 'Contact sécurisant pour futurs parents et bébé.', cta: 'En savoir plus' },
      s3: { tag: 'Thérapie', title: 'Thérapie Psycho-corporelle', sub: 'Reconnexion corps-esprit par le toucher bienveillant.', cta: 'En savoir plus' },
      s4: { tag: 'Enfance', title: 'Bébé & Enfant', sub: 'Massage et éveil corporel dès la naissance.', cta: 'En savoir plus' },
    },
    newsletter: {
      label:      'Newsletter',
      title:      'Conseils bien-être & actualités',
      sub:        'Inspirations, conseils et moments de douceur — jamais de spam.',
      cta:        "S'inscrire",
      placeholder:'votre@email.com',
      disclaimer: 'Désabonnement en 1 clic à tout moment.',
    },
    gift: {
      title: 'Offrir un soin',
      sub:   'Offrez un moment de bien-être unique à un proche. Les bons cadeaux sont disponibles pour toutes les prestations, sans date d\'expiration.',
      cta:   'Demander un bon cadeau',
    },
    pdf: {
      download: 'Télécharger la grille tarifaire (PDF)',
    },
    tabs: {
      book:    'Choisir un créneau',
      message: 'Envoyer un message',
    },
    faq: {
      parking: {
        q: 'Y a-t-il un parking à proximité ?',
        a: 'Le cabinet est facilement accessible en transports en commun (tram 93/94, arrêt Trinité) ou en voiture avec le parking Toison d\'Or à 5 minutes à pied.',
      },
      language: {
        q: 'Travaillez-vous en néerlandais ou en anglais ?',
        a: 'Oui, les consultations peuvent se dérouler en français, en néerlandais et en anglais.',
      },
      gift: {
        q: 'Proposez-vous des bons cadeaux ?',
        a: 'Absolument. Des bons cadeaux sont disponibles pour toutes les prestations, sans date d\'expiration.',
      },
      outfit: {
        q: 'Quelle tenue prévoir pour le massage ?',
        a: 'Sous-vêtements ou tenue légère. Des serviettes sont fournies. La pudeur de chaque personne est entièrement respectée.',
      },
      baby: {
        q: 'Puis-je venir avec mon nourrisson ?',
        a: "Oui, l'espace est adapté pour accueillir les bébés dès la naissance. Le massage bébé et l'haptonomie sont proposés en présence des parents.",
      },
    },
    prestations: {
      hero_title: 'Mes Prestations',
      hero_sub:   'Découvrez mes approches thérapeutiques',
      s1_tag:   'Bien-être',
      s1_title: 'Massage & Relaxation',
      s1_sub:   'Une détente profonde pour le corps et l\'esprit.',
      s1_cta:   'Réserver cette prestation',
      s2_tag:   'Périnatal',
      s2_title: 'Haptonomie',
      s2_sub:   'Un lien unique entre parents et enfant à naître.',
      s2_cta:   'Réserver cette prestation',
      s3_tag:   'Thérapie',
      s3_title: 'Thérapie Psycho-corporelle',
      s3_sub:   'Reconnexion corps-esprit par le toucher.',
      s3_cta:   'Réserver cette prestation',
      s4_tag:   'Enfance',
      s4_title: 'Bébé & Enfant',
      s4_sub:   'Éveil corporel et apaisement dès la naissance.',
      s4_cta:   'Réserver cette prestation',
    },
    apropos: {
      hero_title:   'À propos',
      hero_sub:     'Mon parcours et ma philosophie',
      bio_title:    'Mon parcours',
      timeline_label: 'Formation & Certifications',
      philosophy_label: 'Ma philosophie',
      values_label: 'Mes valeurs',
      closing_title: 'Envie d\'en savoir plus ?',
      closing_cta:   'Me contacter',
    },
    tarifs: {
      hero_title: 'Tarifs',
      hero_sub:   'Investissez dans votre bien-être',
      main_ornament: 'Tarifs & Formules',
      main_title: 'Grille tarifaire',
      main_sub:   'Des formules adaptées à chaque besoin.',
      closing_title: 'Prêt(e) à commencer ?',
      closing_cta:   'Prendre rendez-vous',
    },
    contact: {
      hero_title: 'Contact',
      hero_sub:   'Prenons contact',
      closing_title: 'Une question ?',
      closing_phone:    'Appeler',
      closing_whatsapp: 'WhatsApp',
    },
  },

  /* ══════════════════════════════════════════════════════════════════
     NEDERLANDS — Traduction néerlandaise
  ══════════════════════════════════════════════════════════════════ */
  nl: {
    nav: {
      brand:       'Massages & Geboorte',
      name:        'Nanou Mendels',
      accueil:     'Home',
      prestations: 'Prestaties',
      apropos:     'Over mij',
      tarifs:      'Tarieven',
      contact:     'Contact',
      reserver:    'Reserveren',
    },
    cta: {
      book:       'Afspraak maken',
      learn_more: 'Meer info',
    },
    footer: {
      copyright: '© 2025 Massages & Geboorte — Alle rechten voorbehouden',
      legal:     'Juridische kennisgeving',
      privacy:   'Privacybeleid',
    },
    hero: {
      eyebrow:   'Brussel · Welzijn',
      title:     'Welkom in uw welzijnsruimte',
      sub:       'Massage · Haptonomie · Psycho-corporele therapie',
      discover:  'Ontdekken',
      scroll:    'Scrollen',
    },
    intro: {
      ornament: 'De aanpak',
      quote:    'Zelfs voor de geboorte is aanraking onze eerste verbinding met de wereld.',
    },
    services: {
      ornament: 'Mijn Diensten',
      title:    'Een op maat begeleiding',
      sub:      'Elke sessie is afgestemd op uw specifieke behoeften.',
      all_cta:  'Alle diensten bekijken',
      s1: { tag: 'Welzijn', title: 'Massage & Ontspanning', sub: 'Diepe ontspanning en loslaten van spanningen.', cta: 'Meer info' },
      s2: { tag: 'Perinataal', title: 'Haptonomie', sub: 'Veilig contact voor aanstaande ouders en baby.', cta: 'Meer info' },
      s3: { tag: 'Therapie', title: 'Psycho-corporele therapie', sub: 'Verbinding lichaam-geest via zorgzame aanraking.', cta: 'Meer info' },
      s4: { tag: 'Kindertijd', title: 'Baby & Kind', sub: 'Massage en lichamelijk bewustzijn vanaf de geboorte.', cta: 'Meer info' },
    },
    newsletter: {
      label:       'Nieuwsbrief',
      title:       'Welzijnsadvies & nieuws',
      sub:         'Inspiratie en zachte momenten — nooit spam.',
      cta:         'Inschrijven',
      placeholder: 'uw@email.com',
      disclaimer:  'Uitschrijven met 1 klik op elk moment.',
    },
    gift: {
      title: 'Een behandeling cadeau geven',
      sub:   'Geef een uniek welzijnsmoment aan een dierbare. Cadeaubonnen beschikbaar voor alle behandelingen, zonder vervaldatum.',
      cta:   'Een cadeaubon aanvragen',
    },
    pdf: {
      download: 'Tarieven downloaden (PDF)',
    },
    tabs: {
      book:    'Een tijdstip kiezen',
      message: 'Een bericht sturen',
    },
    faq: {
      parking: {
        q: 'Is er parkeergelegenheid in de buurt?',
        a: 'Het kabinet is gemakkelijk bereikbaar met het openbaar vervoer (tram 93/94, halte Trinité) of met de auto met de parking Toison d\'Or op 5 minuten lopen.',
      },
      language: {
        q: 'Werkt u ook in het Nederlands of Engels?',
        a: 'Ja, consultaties kunnen plaatsvinden in het Frans, Nederlands en Engels.',
      },
      gift: {
        q: 'Verkoopt u cadeaubonnen?',
        a: 'Absoluut. Cadeaubonnen zijn beschikbaar voor alle behandelingen, zonder vervaldatum.',
      },
      outfit: {
        q: 'Welke kleding moet ik meebrengen?',
        a: 'Ondergoed of lichte kleding. Handdoeken zijn aanwezig. De privacy van elke persoon wordt volledig gerespecteerd.',
      },
      baby: {
        q: 'Kan ik komen met mijn pasgeboren baby?',
        a: 'Ja, de ruimte is geschikt voor baby\'s vanaf de geboorte. Baby massage en haptonomie worden aangeboden in aanwezigheid van de ouders.',
      },
    },
    prestations: {
      hero_title: 'Mijn Diensten',
      hero_sub:   'Ontdek mijn therapeutische benaderingen',
      s1_tag:   'Welzijn',
      s1_title: 'Massage & Ontspanning',
      s1_sub:   'Diepe ontspanning voor lichaam en geest.',
      s1_cta:   'Deze dienst reserveren',
      s2_tag:   'Perinataal',
      s2_title: 'Haptonomie',
      s2_sub:   'Een unieke band tussen ouders en het ongeboren kind.',
      s2_cta:   'Deze dienst reserveren',
      s3_tag:   'Therapie',
      s3_title: 'Psycho-corporele therapie',
      s3_sub:   'Verbinding lichaam-geest via aanraking.',
      s3_cta:   'Deze dienst reserveren',
      s4_tag:   'Kindertijd',
      s4_title: 'Baby & Kind',
      s4_sub:   'Lichamelijk bewustzijn en kalmering vanaf de geboorte.',
      s4_cta:   'Deze dienst reserveren',
    },
    apropos: {
      hero_title:        'Over mij',
      hero_sub:          'Mijn parcours en filosofie',
      bio_title:         'Mijn parcours',
      timeline_label:    'Opleiding & Certificaten',
      philosophy_label:  'Mijn filosofie',
      values_label:      'Mijn waarden',
      closing_title:     'Meer weten?',
      closing_cta:       'Contact opnemen',
    },
    tarifs: {
      hero_title:     'Tarieven',
      hero_sub:       'Investeer in uw welzijn',
      main_ornament:  'Tarieven & Formules',
      main_title:     'Tarieflijst',
      main_sub:       'Formules aangepast aan elke behoefte.',
      closing_title:  'Klaar om te beginnen?',
      closing_cta:    'Afspraak maken',
    },
    contact: {
      hero_title:       'Contact',
      hero_sub:         'Neem contact op',
      closing_title:    'Een vraag?',
      closing_phone:    'Bellen',
      closing_whatsapp: 'WhatsApp',
    },
  },

  /* ══════════════════════════════════════════════════════════════════
     ENGLISH — Traduction anglaise
  ══════════════════════════════════════════════════════════════════ */
  en: {
    nav: {
      brand:       'Massages & Birth',
      name:        'Nanou Mendels',
      accueil:     'Home',
      prestations: 'Services',
      apropos:     'About',
      tarifs:      'Rates',
      contact:     'Contact',
      reserver:    'Book',
    },
    cta: {
      book:       'Book an appointment',
      learn_more: 'Learn more',
    },
    footer: {
      copyright: '© 2025 Massages & Birth — All rights reserved',
      legal:     'Legal notice',
      privacy:   'Privacy policy',
    },
    hero: {
      eyebrow:   'Brussels · Well-being',
      title:     'Welcome to your wellness space',
      sub:       'Massage · Haptonomy · Psycho-corporeal therapy',
      discover:  'Discover',
      scroll:    'Scroll',
    },
    intro: {
      ornament: 'The approach',
      quote:    'Even before birth, touch is our first connection to the world.',
    },
    services: {
      ornament: 'My Services',
      title:    'Tailored care for each person',
      sub:      'Every session is designed to meet your specific needs.',
      all_cta:  'View all services',
      s1: { tag: 'Wellness', title: 'Massage & Relaxation', sub: 'Deep relaxation and release of tension.', cta: 'Learn more' },
      s2: { tag: 'Perinatal', title: 'Haptonomy', sub: 'Secure bonding for expectant parents and baby.', cta: 'Learn more' },
      s3: { tag: 'Therapy', title: 'Psycho-corporeal Therapy', sub: 'Body-mind reconnection through caring touch.', cta: 'Learn more' },
      s4: { tag: 'Childhood', title: 'Baby & Child', sub: 'Massage and body awareness from birth.', cta: 'Learn more' },
    },
    newsletter: {
      label:       'Newsletter',
      title:       'Wellness tips & news',
      sub:         'Inspiration and gentle moments — never spam.',
      cta:         'Subscribe',
      placeholder: 'your@email.com',
      disclaimer:  'Unsubscribe in 1 click at any time.',
    },
    gift: {
      title: 'Gift a treatment',
      sub:   'Offer a unique wellness moment to a loved one. Gift cards available for all treatments, with no expiry date.',
      cta:   'Request a gift card',
    },
    pdf: {
      download: 'Download rate card (PDF)',
    },
    tabs: {
      book:    'Choose a time slot',
      message: 'Send a message',
    },
    faq: {
      parking: {
        q: 'Is there parking nearby?',
        a: 'The practice is easily accessible by public transport (tram 93/94, Trinité stop) or by car with the Toison d\'Or car park a 5-minute walk away.',
      },
      language: {
        q: 'Do you work in Dutch or English?',
        a: 'Yes, sessions can take place in French, Dutch and English.',
      },
      gift: {
        q: 'Do you offer gift cards?',
        a: 'Absolutely. Gift cards are available for all treatments, with no expiry date.',
      },
      outfit: {
        q: 'What should I wear for the massage?',
        a: 'Underwear or light clothing. Towels are provided. Everyone\'s privacy is fully respected.',
      },
      baby: {
        q: 'Can I come with my newborn baby?',
        a: 'Yes, the space is adapted for babies from birth. Baby massage and haptonomy are offered in the presence of parents.',
      },
    },
    prestations: {
      hero_title: 'My Services',
      hero_sub:   'Discover my therapeutic approaches',
      s1_tag:   'Wellness',
      s1_title: 'Massage & Relaxation',
      s1_sub:   'Deep relaxation for body and mind.',
      s1_cta:   'Book this service',
      s2_tag:   'Perinatal',
      s2_title: 'Haptonomy',
      s2_sub:   'A unique bond between parents and the unborn child.',
      s2_cta:   'Book this service',
      s3_tag:   'Therapy',
      s3_title: 'Psycho-corporeal Therapy',
      s3_sub:   'Body-mind connection through touch.',
      s3_cta:   'Book this service',
      s4_tag:   'Childhood',
      s4_title: 'Baby & Child',
      s4_sub:   'Body awareness and soothing from birth.',
      s4_cta:   'Book this service',
    },
    apropos: {
      hero_title:        'About',
      hero_sub:          'My journey and philosophy',
      bio_title:         'My journey',
      timeline_label:    'Training & Certifications',
      philosophy_label:  'My philosophy',
      values_label:      'My values',
      closing_title:     'Want to know more?',
      closing_cta:       'Contact me',
    },
    tarifs: {
      hero_title:     'Rates',
      hero_sub:       'Invest in your well-being',
      main_ornament:  'Rates & Packages',
      main_title:     'Rate card',
      main_sub:       'Packages tailored to every need.',
      closing_title:  'Ready to start?',
      closing_cta:    'Book an appointment',
    },
    contact: {
      hero_title:       'Contact',
      hero_sub:         'Get in touch',
      closing_title:    'A question?',
      closing_phone:    'Call',
      closing_whatsapp: 'WhatsApp',
    },
  },
};

/* ══════════════════════════════════════════════════════════════════
   MOTEUR I18N
══════════════════════════════════════════════════════════════════ */
const I18n = {
  current: 'fr',
  supported: ['fr', 'nl', 'en'],

  /**
   * Résoudre une clé "a.b.c" dans un objet imbriqué
   */
  resolve(lang, key) {
    return key.split('.').reduce((obj, k) => (obj != null ? obj[k] : undefined), TRANSLATIONS[lang]);
  },

  /**
   * Appliquer une langue à tous les éléments [data-i18n]
   */
  apply(lang) {
    if (!this.supported.includes(lang)) return;
    this.current = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('nanou-lang', lang);

    // Texte
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = this.resolve(lang, el.dataset.i18n);
      if (text != null) el.textContent = text;
    });

    // Placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const text = this.resolve(lang, el.dataset.i18nPlaceholder);
      if (text != null) el.placeholder = text;
    });

    // Aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const text = this.resolve(lang, el.dataset.i18nAria);
      if (text != null) el.setAttribute('aria-label', text);
    });

    // Boutons actifs
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  },

  /**
   * Initialisation — détection automatique et binding
   */
  init() {
    const saved   = localStorage.getItem('nanou-lang');
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    const detected = this.supported.includes(saved)
      ? saved
      : (this.supported.includes(browser) ? browser : 'fr');

    this.apply(detected);

    // Binding des boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.apply(btn.dataset.lang));
    });
  },
};

// Auto-initialisation au DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
  I18n.init();
}
