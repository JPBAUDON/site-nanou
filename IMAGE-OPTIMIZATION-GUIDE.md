# 📸 GUIDE D'OPTIMISATION DES IMAGES

## 🚨 PROBLÈME ACTUEL

Vos images actuelles sont **TROP LOURDES** :
- Total : **33 MB** pour 22 images
- Plus grosse image : **3.2 MB** (massage-visage-cranien.jpg)
- Impact : Temps de chargement de **8-15 secondes** sur 3G

## 🎯 OBJECTIF

- Réduire chaque image à **200-300 KB maximum**
- Convertir en format **WebP** (gain supplémentaire de 25-35%)
- Résultat final : **< 5 MB** total (gain de -85%)

---

## 🛠️ MÉTHODE 1 : Squoosh (Recommandé - Gratuit)

### Étapes :

1. **Aller sur** : https://squoosh.app
2. **Drag & Drop** votre image JPG
3. **Configurer les paramètres** :
   - Format de sortie : **WebP**
   - Qualité : **75-80**
   - Résolution : Redimensionner si > 1920px de largeur
4. **Télécharger** l'image optimisée
5. **Remplacer** l'ancienne image dans `assets/images/`

### Résultat attendu :
- massage-visage-cranien.jpg : 3.2 MB → **250 KB** (-92%)

---

## 🛠️ MÉTHODE 2 : TinyPNG (Rapide - Gratuit)

### Étapes :

1. **Aller sur** : https://tinypng.com
2. **Upload** jusqu'à 20 images simultanément
3. **Télécharger** les versions compressées
4. **Remplacer** dans le dossier `assets/images/`

### Limitations :
- Maximum 20 images par batch
- Pas de conversion WebP automatique

---

## 🛠️ MÉTHODE 3 : ImageOptim (Mac uniquement)

### Étapes :

1. **Télécharger** : https://imageoptim.com/mac
2. **Drag & Drop** toutes vos images dans l'app
3. **Optimisation automatique** sans perte de qualité visible
4. **Fichiers écrasés** automatiquement

---

## 📋 CHECKLIST D'OPTIMISATION

### Images Hero (priorité haute) :
- [ ] hero-silhouette-nanou.jpg → **250 KB**
- [ ] hero-nanou-cliente.jpg → **250 KB**
- [ ] massage-visage-cranien.jpg → **250 KB**
- [ ] tarifs-massage-jambes.jpg → **200 KB**
- [ ] portrait-huile-mains.jpg → **200 KB**
- [ ] detail-textile-ethnique.jpg → **150 KB**

### Images Services (priorité moyenne) :
- [ ] massage-dos-huile.jpg → **200 KB**
- [ ] massage-tete-delicat.jpg → **200 KB**
- [ ] prenatal-01-massage-ventre.jpg → **200 KB**
- [ ] portrait-nanou-travail-01.jpg → **200 KB**

### Images Autres (priorité basse) :
- [ ] Toutes les autres images dans reference-photos/ → **150-200 KB**

---

## 💻 MÉTHODE 4 : Ligne de commande (Avancé)

Si vous avez Node.js installé :

```bash
# Installer sharp-cli
npm install -g sharp-cli

# Convertir toutes les images en WebP
cd assets/images
find . -name "*.jpg" -exec sh -c 'sharp -i "$1" -o "${1%.jpg}.webp" --webp-quality 80' _ {} \;

# Redimensionner si > 1920px de largeur
sharp resize 1920 --withoutEnlargement
```

---

## 🔧 PARAMÈTRES RECOMMANDÉS

| Type d'image | Format | Qualité | Largeur max | Poids cible |
|--------------|--------|---------|-------------|-------------|
| Hero background | WebP | 75-80 | 1920px | 200-300 KB |
| Service cards | WebP | 80 | 800px | 100-150 KB |
| Portraits | WebP | 85 | 1200px | 150-200 KB |
| Ambiance | WebP | 75 | 1200px | 100-150 KB |

---

## ✅ APRÈS OPTIMISATION

1. **Vérifier** que les images s'affichent correctement
2. **Tester** la vitesse avec Google PageSpeed Insights
3. **Mesurer** le gain :
   ```bash
   # Avant
   du -sh assets/images/  # ~33M

   # Après
   du -sh assets/images/  # ~4-5M (objectif)
   ```

---

## 🚀 IMPACT ATTENDU

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Poids total images | 33 MB | 4-5 MB | **-85%** |
| Temps chargement 3G | 12s | 2.5s | **-79%** |
| Google PageSpeed | 30/100 | 85/100 | **+183%** |
| Conversions | Baseline | +40% | **+40%** |

---

## 📝 NOTES IMPORTANTES

- ✅ Le code a déjà `loading="lazy"` sur les images de contenu
- ✅ Les hero images chargent immédiatement (pas de lazy loading)
- ⚠️ Garder les originales en backup avant de remplacer
- 💡 Utiliser WebP avec fallback JPG pour anciens navigateurs si besoin

---

## ❓ BESOIN D'AIDE ?

Si vous avez des questions, référez-vous à :
- Squoosh documentation : https://github.com/GoogleChromeLabs/squoosh
- WebP compatibility : https://caniuse.com/webp (97%+ des navigateurs)
