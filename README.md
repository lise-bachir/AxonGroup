# Axon Group — Site vitrine

Site vitrine de services informatiques. Aucun outil à installer : ce sont de simples fichiers HTML/CSS.

## Voir le site
Double-cliquez sur `index.html` : il s'ouvre dans votre navigateur.

## Modifier le site (tout se fait depuis GitHub, dans le navigateur)
Ouvrez le fichier, cliquez sur le crayon ✏️, modifiez, puis « Commit changes ».
Les endroits à personnaliser sont repérés par le symbole ✏️ dans les fichiers.

| Ce que vous voulez changer | Fichier |
|---|---|
| Textes, services, chiffres, avis clients, adresse, téléphone | `index.html` |
| E-mail qui reçoit les devis + numéro WhatsApp | `js/main.js` (2 lignes en haut) |
| Couleurs du site | `css/style.css` (variables en haut du fichier) |
| Logos clients : déposez-les dans `assets/clients/` puis voir la section « Ils nous font confiance » de `index.html` | `index.html` |
| Mentions légales (RCCM, NINEA…) | `mentions-legales.html` |
| Logo | `assets/favicon.svg` (remplaçable par votre propre logo) |

## Mettre le site en ligne gratuitement (une seule fois)
1. Dans Settings → Branches, la branche par défaut est celle du site.
2. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.
3. Le site est publié automatiquement à chaque modification.

## Boutique (vente et location)
La boutique est la page `boutique.html`. Tous les produits sont dans **un seul fichier : `js/products.js`**.
- **Ajouter un produit** : copiez une ligne `P("catégorie", "Marque", "Modèle", ["caractéristique", …], "VL")` et modifiez-la.
  `"VL"` = vente et location, `"V"` = vente seule, `"L"` = location seule.
- **Photos** : les photos sont dans `assets/produits/`, une par produit, nommée comme l'identifiant du produit (format `.webp`).
  Pour une nouvelle photo, déposez-la dans ce dossier et ajoutez l'identifiant à la liste `IMAGE_IDS` en bas de `js/products.js`.
  Le logo Axon Group est ajouté automatiquement en bas de chaque photo.
- **Options à choisir** (longueur, couleur, calibre…) : dernier paramètre de la ligne,
  ex. `P("cables", "Belkin", "Câble HDMI", [...], "V", "", { "Longueur": ["1 m", "2 m", "3 m"] })`.
- **Supprimer un produit** : effacez sa ligne.
- Aucun prix n'est affiché. Le visiteur compose sa demande (panier), puis elle arrive par e-mail sur commercial@axongroupcorp.com.
