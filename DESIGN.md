# DESIGN.md · Le Japon en Noir et Blanc

## Direction
Le Japon traditionnel, version créateur : papier washi, rouge du drapeau, encre sumi en contrepoint. On doit sentir un vrai résident, pas une agence de voyage.
Références : l'affiche japonaise (aplats, soleil rouge, kanji en vertical) et les miniatures YouTube de Kevin (contraste, rouge).

## Couleurs
| Rôle | Nom | Code |
| --- | --- | --- |
| Principale | Rouge hinomaru | `#bc002d` |
| Principale foncée (survol, bandes) | Rouge laque | `#8a0020` |
| Accent | Encre sumi | `#141210` |
| Fond | Washi | `#faf7f0` |
| Surface | Blanc | `#ffffff` |
| Texte secondaire | Pierre | `#6b655c` |
| Filets | Sable | `#e6dfd2` |

Aucune couleur en dur hors de `:root`. Aucun dégradé décoratif : seuls les voiles sombres sur photo pour lire le texte.

## Typographie
- Titres : **Shippori Mincho**, graisse 800.
- Texte, boutons, légendes : **Zen Kaku Gothic New**, graisses 400, 500 et 700.
- Échelle : H1 `clamp(52px, 8vw, 112px)` · H2 `clamp(38px, 5.6vw, 72px)` · H3 22 à 28 px · texte 16 px · légende 13 px · surtitre 12 px en capitales, interlettrage 0,2 em.

## Formes
- **Un seul rayon : 4 px** (boutons, cartes, champs, badges, images).
- Une seule forme signature, déclarée : l'**arche** (haut en demi-cercle) pour les deux grandes photos.
- Espacements sur une grille de 8 px.
- Boutons : 1 principal (rouge plein), 1 secondaire (contour encre).

## Icônes
Un seul jeu : **Lucide**, trait 1,75, 20 px, dessinées en SVG dans la page. Aucun emoji dans l'interface.

## Mouvement (choix de marque assumé)
Seules animations autorisées :
1. Titres : apparition ligne par ligne (masque qui glisse de bas en haut), 700 ms.
2. Sections et cartes : montée de 24 px + fondu, en cascade de 80 ms.
3. Photos en arche : rideau qui s'ouvre (clip-path), une fois.
4. Soleil rouge : léger décalage au scroll (parallaxe de 10 % maximum).
5. Chiffres : comptage jusqu'à la valeur réelle, une fois.
6. Bandeau défilant rouge sous l'accueil.
7. Livres : pivot 3D au survol.
8. Barre de progression de lecture, en haut.
Tout est coupé avec `prefers-reduced-motion`. Sans JavaScript, tout le contenu est visible.

## Ton
- Tutoiement, comme Kevin dans ses vidéos.
- Phrases de 15 mots maximum. On dit ce qu'on vend, à qui, et ce que ça change.
- Zéro tiret long. Zéro emoji.
- Mots interdits : transformer, libérer, booster, ultime, révolutionnaire, incroyable, solution, expérience unique, voyage inoubliable, n'attendez plus.

## Pop-up newsletter
S'ouvre après 15 secondes, une seule fois tous les 7 jours, se ferme avec Échap, la croix ou un clic à côté.
