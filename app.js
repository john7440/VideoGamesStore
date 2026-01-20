// -------------- Les classes ---------------- //

// Définition de la classe Game avec son constructeur
// et ses propriétés (id, title, price, category, image, description)

class Game{
    constructor(id, title, price, category, image, description){
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
    }
}

// Classe Store pour gérer les jeux disponibles en Local Storage
// pour simuler une base de données
class Store{
    static getGames() {
        let games;
        if(localStorage.getItem("games") === null){
            // Les données par défaut pour le site pusiqu'il n'y a pas encore de jeux en Local Storage
            // Note: je sépare volontaireemnt avec un espaces les données tout les 4 jeux pour refléter l'affichage du site
            games = [
                // La première ligne de jeux
                new Game(1, "The Legend of Zelda: Breath of the Wild", 59.99, "Aventure", "zelda.jpg", "Explorez le vaste monde d'Hyrule sur votre fidèle poney"),
                new Game(2, "Cyberpunk 2077", 49.99, "RPG", "cyberpunk2077.jpg", "Plongez dans un futur dystopique (mais pas tant que ça) rempli de technologies avancées et de choix moraux ou immoraux"),
                new Game(3, "GTA VI", 79.99, "Action", "gta6.jppg", "Moins bien que Wordle et le jeu précédent mais plus cher"),
                new Game(4, "God of War", 39.99, "Action", "godofwar.jpg", "Incarnez Kratos dans sa quête épique à travers le nord (de la France)"),

    }
}