# Massages & Naissance - Site Vitrine

Site vitrine professionnel pour une praticienne en massage, haptonomie et thérapie psycho-corporelle basée à Bruxelles.

## 📋 Vue d'ensemble

Ce site moderne et responsive présente les services d'accompagnement en bien-être avec une approche humaniste et bienveillante.

### 🎯 Objectifs

- Présenter les prestations de manière professionnelle et rassurante
- Faciliter la prise de contact et de rendez-vous
- Optimiser le référencement local (Bruxelles)
- Offrir une expérience utilisateur fluide sur tous les appareils

## 🏗️ Structure du site

```
/
├── index.html              # Page d'accueil
├── prestations.html        # Détail des services
├── a-propos.html          # Présentation de la praticienne
├── tarifs.html            # Grille tarifaire
├── contact.html           # Formulaire de contact
├── mentions-legales.html  # Mentions légales
├── confidentialite.html   # Politique RGPD
└── README.md             # Ce fichier
```

## 🎨 Design System

### Palette de couleurs

- **Vert sauge** (#8BA888) : Couleur principale, apaisante et naturelle
- **Beige chaud** (#E8DCC4) : Couleur secondaire, douceur et neutralité
- **Terracotta** (#D4A59A) : Accent, chaleur et humanité
- **Blanc cassé** (#FDFBF7) : Fond principal
- **Gris anthracite** (#3A4F41) : Textes

### Typographie

- **Titres** : Playfair Display (serif élégant)
- **Corps de texte** : Inter (sans-serif moderne et lisible)

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **Tailwind CSS** : Framework CSS via CDN
- **JavaScript Vanilla** : Interactions légères
- **Google Fonts** : Typographies web

## ✨ Fonctionnalités

### Navigation
- Header sticky avec ombre au scroll
- Menu hamburger responsive pour mobile
- Liens internes avec smooth scroll

### Interactions
- Accordéon FAQ
- Formulaire de contact avec validation
- Animations subtiles au scroll
- Bouton WhatsApp flottant

### SEO & Performance
- Balises meta optimisées
- Structure HTML sémantique
- Images optimisées (placeholders SVG)
- Alt text sur tous les éléments visuels

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- **Mobile** : 320px - 767px
- **Tablette** : 768px - 1023px
- **Desktop** : 1024px et plus

## 🚀 Déploiement

### Hébergement recommandé

Le site peut être hébergé sur :
- **Netlify** (recommandé, gratuit)
- **Vercel**
- **GitHub Pages**
- **OVH**
- Tout hébergement web statique

### Étapes de déploiement

1. **Via Netlify (simple)**
   ```bash
   # Installer Netlify CLI
   npm install -g netlify-cli

   # Se connecter
   netlify login

   # Déployer
   netlify deploy --prod
   ```

2. **Via FTP classique**
   - Uploader tous les fichiers HTML à la racine
   - Vérifier que index.html est bien le fichier d'entrée

3. **Via GitHub Pages**
   - Push le code sur GitHub
   - Activer GitHub Pages dans Settings > Pages
   - Sélectionner la branche main

## 🔧 Personnalisation

### Modifier les couleurs

Dans chaque fichier HTML, modifier la config Tailwind :

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                sage: { ... },    // Vos couleurs
                beige: { ... },
                terracotta: { ... }
            }
        }
    }
}
```

### Ajouter Google Maps

Dans `contact.html`, remplacer le placeholder par :

```html
<iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
    width="100%"
    height="100%"
    style="border:0;"
    allowfullscreen=""
    loading="lazy">
</iframe>
```

### Configurer le formulaire de contact

Le formulaire actuel fonctionne en JavaScript vanilla. Pour le connecter à un backend :

**Option 1 : Formspree (recommandé)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2 : Netlify Forms**
```html
<form name="contact" method="POST" data-netlify="true">
```

**Option 3 : Backend personnalisé**
Modifier le JavaScript dans `contact.html` pour envoyer vers votre API.

### Ajouter WhatsApp

Remplacer `32XXXXXXXXX` par le vrai numéro de téléphone (format international sans + ni espaces) :

```html
<a href="https://wa.me/32470123456">
```

## 📊 SEO & Analytics

### Ajouter Google Analytics

Dans le `<head>` de chaque page :

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Meta tags à personnaliser

Dans chaque page, mettre à jour :
- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` (ajouter une image Open Graph)

### Créer un sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://massages-et-naissance.com/</loc>
    <lastmod>2025-01-XX</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://massages-et-naissance.com/prestations.html</loc>
    <lastmod>2025-01-XX</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- ... autres pages -->
</urlset>
```

## ✅ Checklist avant mise en ligne

- [ ] Remplacer tous les `[À compléter]` dans mentions légales
- [ ] Ajouter le vrai numéro de téléphone
- [ ] Ajouter la vraie adresse email
- [ ] Configurer le formulaire de contact
- [ ] Ajouter Google Maps
- [ ] Ajouter une vraie photo dans "À propos"
- [ ] Personnaliser les témoignages
- [ ] Ajouter Google Analytics
- [ ] Créer un sitemap.xml
- [ ] Créer un robots.txt
- [ ] Tester sur mobile
- [ ] Tester le formulaire
- [ ] Vérifier tous les liens
- [ ] Optimiser les images (si ajoutées)

## 📞 Support & Questions

Pour toute question technique sur ce site, contactez le développeur.

## 📄 Licence

© 2025 Massages & Naissance - Tous droits réservés

---

**Développé avec ❤️ pour le bien-être**
