# GameZone - Boutique E-Commerce SPA

**GameZone** est une application web de type **SPA (Single Page Application)** permettant de consulter, filtrer et acheter des jeux vidéo. Le projet met l'accent sur l'expérience utilisateur, le design responsive et une architecture JavaScript orientée objet (POO)

## Sommaire
- [Fonctionnalités](#fonctionalités)

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
  
