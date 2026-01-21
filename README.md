# GameZone - Boutique E-Commerce SPA

**GameZone** est une application web de type **SPA (Single Page Application)** permettant de consulter, filtrer et acheter des jeux vidéo. Le projet met l'accent sur l'expérience utilisateur, le design responsive  avec Bootstrap et une architecture JavaScript orientée objet (POO)

## Sommaire
- [Fonctionnalités](#fonctionalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Architecture du code](#architecture-du-code)
- [Choix de design et UX](#choix-de-design-et-ux)
- [Installation et Utilisation](#installation-et-utilisation)
- [Qualité du code](#qualité-du-code)
- [License](#licence)
  

## Fonctionnalités

#### Partie Client (Utilisateur): 
- **Catalogue Dynamique**: Affichage des jeux sous forme de grille responsive
- **Filtres par catégories**: Filtrage instantané avec boutons (RPG, Action, Aventure, Simulation et MEUPORG) sans rechargement de la page
- **Fiche produit**: Affichage des détails d'un jeu(image, desscirption, prix) dans une fenêtre modale qui s'ouvre quand on clique sur un jeu
- **Panier Interactif**:
  - Ajout d'articles depuis la grille ou la fiche produit
  - Modification des quantité (plus ou moins) avec des boutons
  - Suppression d'articles avec un bouton supprimer
  - Calcul automatique du total
- **Achat rapide**: Via un bouton "Acheter maintenant"

#### Partie Administration
- **Simulation de connexion**: Interface de login (le formulaire uniquement la partie connexion n'est pas gérer)
- **Gestion des Jeux**: Uniquement pour ajouter des nouveaux jeux (via un formulaire)
- **Persistance des données**: Les nouveaux jeux sont sauvegardés dans le **Local Storage** du navigateur (reste après un rafraichissment de la page)
  
## Technologies Utilisées

Le projet a été réalisé sans Framework JS lourd

- **HTML5**: Structure sémantique et accessible
- **CSS et Bootstrap 5**:
  - CSS personnalisé dans `style.css`
  - Utilisation de bootstrap pour la grille et les composants (Modales, navbar)
- **Javascrpit**:
  - Approche orientée objet (POO)
  - Utilisation du **Local storage** pour simuler une base de données
  - Pas de dépendances externes utilisées
    
## Structure du projet

```text
projet/
├─ docs
|  ├─ 01-Usecase
|  |  ├─ usecase.png                     # diagramme use case en format png
|  |  └─ usecase.puml                    # diagramme use case en format plantuml
|  ├─ 02-Class
|  |  ├─ class.png                       # diagramme de classe en format png
|  |  └─ class.puml                      # diagramme de classe en format plantuml
|  └─ maquettev10                        # La maquette du site (en format png, effectué sur Excalidraw)
├─ index.html                            # la partie html avec bootstrap
├─ styles.css                            # la partie CSS personnalisé
├─ app.js                                # la partie JavaScrit pour gérer la dynamique du site
├─ README.md                             # ce fichier                                
└─ images/                               # les images utilisées pour les jeux 
   ├─ bd3.jpg
   ├─ cyberpunk2077.jfif
   ├─ fallout3.webp
   ├─ gta6.jpg
   ├─ power2.jpg
   └─ starfield.jpg(etc.)
```
## Architecture du code

Le code JavaScript (`app.js`) est structuré autour de 4 classes principales pour respecter le principe de séparation des responsabilités :
1.  **`class Game`** : Définit le modèle de données d'un jeu (ID, titre, prix, méthode de formatage...)
2.  **`class Store`** : Gère la persistance des données (avec LocalStorage)
3.  **`class Cart`** : Gère la logique métier du panier (ajout, suppression, calcul du total)
4.  **`class UI`** : Gère uniquement la manipulation du DOM (affichage des cartes, gestion des modales, filtres...)

## Choix de Design et UX

- **Cartes épurées :** Affichage prioritaire du visuel et du prix. L'interaction se fait au clic sur la carte entière
- **Feedback Utilisateur :**
    * Les boutons changent d'état au survol
    * Des alertes confirment les actions (ajout panier, commande validée)
- **Modales :** Utilisation des modales pour éviter les rechargements de page et garder l'utilisateur dans le contexte d'achat

## Installation et Utilisation

1. Cloner le projet:
   ```bash
   git clone https://github.com/john7440/VideoGamesStore.git
   ```
2.  Ouvrir le fichier **`index.html`** dans n'importe quel navigateur moderne (Chrome, Firefox, Edge)
3.  Ou via Vscode avec le plugin LiveServer et clique droit 'Open with Live Server'
4.  **Pour tester l'admin :**
    * Cliquer sur "Admin" dans le menu
    * Remplir le formulaire puis cliquer sur le bouton 'ajouter un jeu'
    * Le jeu s'ajoute immédiatement à la grille et au LocalStorage

## Qualité du code

- Validation Sonarqube respectée
- Séparation HTML / CSS / JS

## Licence
Je ne possède pas les droits sur les images présentent sur le site, le site est utilisé uniquement a des fins pédagogique pour améliorer mes compétences en Web





