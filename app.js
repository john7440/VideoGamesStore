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
    // méthode poure récuperer les jeux depuis le local storage
    static getGames() {
        let games;
        if(localStorage.getItem("games") === null){
            // Les données par défaut pour le site pusiqu'il n'y a pas encore de jeux en Local Storage
            // note: je sépare volontaireemnt avec un commentaire les données tout les 4 jeux pour refléter l'affichage du site
            games = [
                // La première ligne de jeux
                new Game(1, "The Legend of Zelda: Breath of the Wild", 59.99, "Aventure", "zelda.jpg", "Explorez le vaste monde d'Hyrule sur votre fidèle poney"),
                new Game(2, "Cyberpunk 2077", 49.99, "RPG", "cyberpunk2077.jpg", "Plongez dans un futur dystopique (mais pas tant que ça) rempli de technologies avancées et de choix moraux ou immoraux"),
                new Game(3, "GTA VI", 79.99, "Action", "gta6.jppg", "Moins bien que Wordle et le jeu précédent mais plus cher"),
                new Game(4, "God of War", 39.99, "Action", "godofwar.jpg", "Incarnez Kratos dans sa quête épique à travers le nord (de la France)"),
                // 2ème ligne
                new Game(5, "World of Warcraft", 29.99, "MEUPORG", "wow.jpg", "Rejoignez des milliards de joueurs dans ce MEUPORG légendaire et vivez des aventures épiques dans le monde d'Azeroth"),
                //TODO ajouter des autres jeux
            ];

    } else {
            games = JSON.parse(localStorage.getItem('games'));
    }
        return games;
    }

    // méthode pour ajouter un jeu au local storage
    static addGame(game){
        const games = Store.getGames(); 
        games.push(game);
        localStorage.setItem('games', JSON.stringify(games));
    }
}

// La classe pour gérer le panier
class Cart{
    constructor(){
        this.items = [];
    }
    // méthode pour ajouter un jeu au panier
    addItem(game){
        const existingItem = this.items.find(item => item.game.id === game.id);
        if(existingItem){
            existingItem.quantity++;
        } else {
            this.items.push({ game, quantity: 1 });
        }
        this.updateUI();
    }
    
    //méthode pour supprimer un jeu du panier
    removeItem(gameId){
        this.items = this.items.filter(item => item.game.id !== Number.parseInt(gameId));
        this.updateUI();
        
    }
    
    // méthode pour changer la quantité dans le panier
    updateQuantity(gameId, newQuantity){
        const item = this.items.find(item => item.game.id === Number.parseInt(gameId));
        if(item){
            item.quantity += newQuantity;
            if (item.quantity <= 0) this.removeItem(gameId);
            else this.updateUI();
        }
    }

    // méthode pour calculer le total du panier
    getTotal(){
        return this.items.reduce((total, item) => total + item.game.price * item.quantity, 0);
    }

    // méthode pour vider le panier
    clearCart(){
        this.items = [];
        this.updateUI();
    }

    // méthode pour mettre a jour l'ui du panier
    updateUI() {
        //le badge du compteur pour le panier
        const totalCount = this.items.reduce((acc, item) => acc + item.quantity,0);
        document.getElementById('cart-count').innerText = totalCount;

        //liste pour la modal du panier
        const cartContainer = document.getElementById('cart-items-container');
        const totalDisplay = document.getElementById('cart-total');

        cartContainer.innerHTML = '';

        //gestion panier vide
        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p class="text-center text-muted">Votre panier est vide.</p>';
        } else {
            this.items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'd-flex justify-content-between align-items-center mb-3 border-bottom pb-2';
                div.innerHTML = `
                    <div>
                        <h6 class="mb-0">${item.game.title}</h6>
                        <small class="text-muted">${item.game.price} € x ${item.quantity}</small>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.game.id}" data-action="-">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.game.id}" data-action="+">+</button>
                        <button class="btn btn-sm btn-danger remove-btn" data-id="${item.game.id}"><i class="bi bi-trash"></i></button>
                    </div>
                `;
                cartContainer.appendChild(div);
            });
        }
        
        totalDisplay.innerText = this.getTotal().toFixed(2);
    }
}
