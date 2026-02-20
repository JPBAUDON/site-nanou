# Guide du site — Massages & Naissance
### Nanou Mendels · massages-et-naissance.com

> **À qui s'adresse ce document ?**
> À toi, Nanou, pour que tu comprennes comment fonctionne ton site et quels comptes tu dois gérer.
> Il est aussi rédigé pour être lu par un développeur ou par Claude Code, qui peut s'en servir comme point de départ pour t'aider.

---

## 1. En un mot : comment fonctionne ce site ?

Ton site est un **site statique** — c'est-à-dire un ensemble de fichiers HTML, CSS et JavaScript, sans base de données, sans WordPress, sans serveur complexe. C'est délibéré : c'est plus rapide, plus sécurisé, moins cher à héberger, et plus facile à maintenir.

Il est **hébergé gratuitement sur Vercel**, une plateforme professionnelle qui s'occupe de le mettre en ligne et de gérer le HTTPS. L'hébergement est pour l'instant rattaché au compte du développeur (Samuel Baudon) — il n'y a rien à payer de ton côté pour l'hébergement.

Le **code source** du site est stocké sur GitHub (une plateforme qui garde l'historique de toutes les modifications du site). Chaque fois qu'une modification est faite et "poussée", Vercel redéploie le site automatiquement en moins d'une minute.

---

## 2. Les pages du site

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `massages-et-naissance.com` | Page principale avec présentation et témoignages |
| Prestations | `/prestations` | Détail des soins proposés |
| À propos | `/a-propos` | Parcours et philosophie de Nanou |
| Tarifs | `/tarifs` | Grille tarifaire |
| Contact | `/contact` | Formulaire de message + prise de RDV Calendly |
| Mentions légales | `/mentions-legales` | Mentions légales obligatoires |
| Confidentialité | `/confidentialite` | Politique de confidentialité RGPD |

---

## 3. Comment le site a-t-il été construit ?

### Technologies utilisées

| Élément | Technologie | Pourquoi |
|---------|-------------|----------|
| Structure des pages | HTML5 | Base standard de tout site web |
| Mise en page & style | Tailwind CSS v4 | Framework CSS moderne, compilé en local |
| Comportements & animations | JavaScript vanilla (nanou.js) | Pas de framework lourd, code sur mesure |
| Traductions (FR/NL/EN/IT) | Système i18n maison (i18n.js) | 4 langues intégrées sans outil externe |
| Animations d'entrée | GSAP 3.12.5 | Bibliothèque d'animation professionnelle |
| Défilement fluide | Lenis 1.2.3 | Scroll "inertie" premium |
| Animations de texte | SplitType 0.3.4 | Effet lettre par lettre |
| Icônes | Phosphor Icons | Icônes fines et élégantes |
| Polices | Google Fonts | Cormorant Garamond · Cinzel · Playfair Display · DM Sans |

### Structure des fichiers importants

```
site-nanou-code/
├── index.html              ← Page d'accueil
├── prestations.html        ← Prestations
├── a-propos.html           ← À propos
├── tarifs.html             ← Tarifs
├── contact.html            ← Contact
├── mentions-legales.html   ← Légal
├── confidentialite.html    ← RGPD
├── vercel.json             ← Configuration hébergement Vercel
├── sitemap.xml             ← Plan du site pour Google
├── robots.txt              ← Instructions pour les moteurs de recherche
└── assets/
    ├── css/
    │   ├── input.css       ← SOURCE CSS (à modifier si besoin)
    │   └── nanou.css       ← CSS compilé (généré automatiquement)
    ├── js/
    │   ├── nanou.js        ← SOURCE JavaScript (à modifier si besoin)
    │   ├── nanou.min.js    ← JS minifié (généré automatiquement)
    │   ├── i18n.js         ← SOURCE traductions (à modifier si besoin)
    │   └── i18n.min.js     ← Traductions minifiées (généré automatiquement)
    ├── images/             ← Photos et images du site
    └── videos/             ← Vidéos éventuelles
```

> **Important pour les développeurs / Claude Code** : Les fichiers `.min.js` sont générés automatiquement à partir des fichiers `.js` source via `npx terser`. Ne jamais modifier les `.min.js` directement. Le CSS est compilé via `./tailwindcss-macos-arm64 -i assets/css/input.css -o assets/css/nanou.css --minify`. Après toute modification de nanou.js ou i18n.js, regénérer les `.min.js` et incrémenter le cache-buster `?v=XXXXXXXX` dans tous les HTML.

---

## 4. Services externes — les abonnements qui font fonctionner le site

Ce sont les services tiers connectés au site. Certains sont déjà actifs, d'autres restent à configurer.

---

### 4.1 Vercel — Hébergement ✅ Actif

| Info | Détail |
|------|--------|
| Rôle | Met le site en ligne, gère le HTTPS, redirige le domaine |
| Site | vercel.com |
| Compte | Compte de Samuel Baudon (JPBAUDON) |
| Coût | Gratuit (plan Hobby) — suffisant pour ce site |
| Quand payer ? | Seulement si le site reçoit un trafic très important (peu probable) |

---

### 4.2 OVH — Nom de domaine ✅ Actif (renouvellement annuel)

| Info | Détail |
|------|--------|
| Rôle | Propriétaire du nom de domaine massages-et-naissance.com |
| Site web | ovhcloud.com |
| Compte | Nanou Mendels — nanoumendels@gmail.com |
| Coût | ~10-15€/an |
| Renouvellement | Annuel — activer le renouvellement automatique pour éviter une coupure |
| Lien avec Vercel | Le domaine pointe vers Vercel via les DNS configurés dans OVH |

> ⚠️ **Important** : Si l'abonnement OVH n'est pas renouvelé, le site devient inaccessible. Activer le renouvellement automatique dans le compte OVH.

---

### 4.3 GitHub — Hébergement du code ✅ Actif

| Info | Détail |
|------|--------|
| Rôle | Stocke tout le code source, garde l'historique des modifications |
| Site | github.com |
| Compte | Compte de Samuel Baudon (JPBAUDON) |
| Dépôt | `JPBAUDON/site-nanou` (privé) |
| Coût | Gratuit |

---

### 4.3 Formspree — Formulaire de contact ✅ Actif (à vérifier)

| Info | Détail |
|------|--------|
| Rôle | Reçoit les messages envoyés depuis la page Contact et les envoie par email |
| Site | formspree.io |
| ID formulaire | `mojnlorr` |
| Coût | Gratuit jusqu'à 50 messages/mois — largement suffisant |
| Action requise | Vérifier que l'email de confirmation Formspree a bien été validé |

> **Comment ça marche ?** Quand un visiteur remplit le formulaire de contact et clique "Envoyer", le message arrive directement dans ta boîte email. Tu n'as pas à te connecter à Formspree pour lire les messages.

---

### 4.4 Calendly — Prise de rendez-vous ⚠️ À CONFIGURER

| Info | Détail |
|------|--------|
| Rôle | Permet aux clients de prendre RDV directement en ligne |
| Site | calendly.com |
| Compte | À créer par Nanou |
| Coût | Gratuit pour 1 type de RDV (plan Basic) |
| Statut | **Non configuré** — bouton "Réserver" redirige vers le formulaire en attendant |

> **Étapes pour activer Calendly :**
> 1. Créer un compte sur calendly.com avec ton adresse email professionnelle
> 2. Créer un "event type" (ex : "Consultation 60 min")
> 3. Copier ton lien Calendly (ex : `calendly.com/nanou-mendels/consultation`)
> 4. Donner ce lien à ton développeur pour l'intégrer dans les 28 endroits du site où il est attendu
>
> **Note pour développeurs / Claude Code :** Chercher `NANOU_CALENDLY_URL` dans tous les fichiers HTML — il y a 28 occurrences à remplacer par l'URL réelle. Exemple : `sed -i '' 's|NANOU_CALENDLY_URL|nanou-mendels/consultation|g' *.html`

---

### 4.5 Brevo — Newsletter ⚠️ À CONFIGURER

| Info | Détail |
|------|--------|
| Rôle | Gère les inscriptions à la newsletter et l'envoi d'emails à tes abonnés |
| Site | brevo.com |
| Compte | À créer par Nanou |
| Coût | Gratuit jusqu'à 300 emails/jour et contacts illimités |
| Statut | **Non connecté** — le formulaire newsletter est présent mais inactif |

> **Pourquoi Brevo et pas un autre service ?** Brevo est conforme RGPD, basé en Europe, gratuit pour commencer, et permet d'envoyer de vraies newsletters (pas juste collecter des emails).
>
> **Étapes pour activer :**
> 1. Créer un compte sur brevo.com
> 2. Créer une liste de contacts "Newsletter Massages & Naissance"
> 3. Générer une clé API dans Paramètres → Clés API
> 4. Donner la clé API et l'ID de liste à ton développeur

---

### 4.6 Google Maps — Carte intégrée ✅ Actif (carte de base)

| Info | Détail |
|------|--------|
| Rôle | Affiche la carte de localisation sur la page Contact |
| Statut | Carte Google Maps intégrée, localisée Avenue Louise 349, Bruxelles |
| Amélioration possible | Connecter à Google Business pour afficher les avis et horaires en direct |

---

### 4.7 Google Fonts — Polices ✅ Actif

| Info | Détail |
|------|--------|
| Rôle | Charge les polices d'écriture élégantes du site |
| Polices utilisées | Cormorant Garamond (titres), Cinzel, Playfair Display, DM Sans |
| Coût | Gratuit |
| Compte nécessaire | Non — chargé automatiquement |

---

## 5. Sécurité — ce qui est en place

Le site intègre plusieurs mesures de sécurité configurées dans `vercel.json` :

| Mesure | Ce que ça fait |
|--------|----------------|
| **HTTPS automatique** | Toutes les connexions sont chiffrées (cadenas vert dans le navigateur) |
| **HSTS** | Force le navigateur à toujours utiliser HTTPS, jamais HTTP |
| **X-Frame-Options** | Empêche que ton site soit intégré dans un autre site à ton insu |
| **Content-Security-Policy** | Bloque les scripts malveillants non autorisés |
| **X-Content-Type-Options** | Empêche certaines attaques liées aux types de fichiers |
| **Referrer-Policy** | Contrôle quelles informations sont partagées lors des clics sortants |
| **Honeypot anti-spam** | Champ invisible dans le formulaire de contact pour piéger les robots |
| **Consentement RGPD** | Case à cocher obligatoire avant l'envoi d'un message |
| **URLs propres** | Les URLs sans `.html` (`/contact` au lieu de `/contact.html`) |

---

## 6. SEO — référencement Google

Le site est configuré pour être bien indexé par les moteurs de recherche :

- **Balises meta** : titre, description, mots-clés sur chaque page
- **Open Graph** : aperçu soigné quand on partage un lien sur les réseaux sociaux
- **Sitemap XML** : plan du site envoyable à Google Search Console
- **Hreflang** : indique à Google les 4 langues disponibles (FR, NL, EN, IT)
- **Canonical URLs** : évite le contenu dupliqué

> **Action recommandée** : Connecter le site à **Google Search Console** (search.google.com/search-console) avec le compte Google de Nanou pour suivre les performances SEO et soumettre le sitemap.

---

## 7. Ce qui reste à faire

| Tâche | Priorité | Qui fait quoi |
|-------|----------|---------------|
| Créer un compte Calendly et partager le lien | 🔴 Urgent | Nanou crée → développeur intègre |
| Vérifier la réception des messages Formspree | 🔴 Urgent | Nanou teste en envoyant un message |
| Créer un compte Brevo pour la newsletter | 🟡 Important | Nanou crée → développeur connecte |
| Créer un compte Google Business | 🟡 Important | Nanou crée (gratuit) |
| Connecter Google Search Console | 🟢 Utile | Nanou donne accès → développeur configure |
| Ajouter de vraies photos professionnelles | 🟡 Important | Nanou fournit les photos |

---

## 8. Pour obtenir de l'aide

### Pour des modifications techniques
Contacter **Samuel Baudon** — le développeur du site.

### Pour utiliser Claude Code toi-même
1. S'abonner sur claude.ai (plan Pro ou Team)
2. Utiliser l'extension Claude Code dans VS Code, ou la version web
3. Donner ce document en contexte au début de chaque conversation
4. Décrire ce que tu veux modifier en langage naturel

> **Note pour Claude Code :** Ce site est un projet HTML/CSS/JS statique. Les fichiers source sont dans `site-nanou-code/`. Toujours modifier `nanou.js` (pas `.min.js`), puis regénérer avec terser. Toujours modifier `input.css` (pas `nanou.css`), puis recompiler avec tailwindcss. Incrémenter le cache-buster `?v=` dans les 7 HTML après chaque modification JS ou CSS.

---

## 9. Contacts et accès résumés

| Service | Lien | Compte |
|---------|------|--------|
| Site en ligne | massages-et-naissance.com | — |
| Vercel (hébergement) | vercel.com | Compte Samuel Baudon (JPBAUDON) |
| GitHub (code) | github.com/JPBAUDON/site-nanou | Compte Samuel Baudon (JPBAUDON) |
| Formspree (formulaire) | formspree.io | À vérifier avec Samuel |
| Calendly (RDV) | calendly.com | À créer par Nanou |
| Brevo (newsletter) | brevo.com | À créer par Nanou |
| Google Business | business.google.com | À créer par Nanou |
| Google Search Console | search.google.com/search-console | À créer par Nanou |

---

*Document rédigé le 19 février 2026 — à mettre à jour à chaque évolution importante du site.*
