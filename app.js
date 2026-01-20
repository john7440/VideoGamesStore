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
                new Game(1, "The Legend of Zelda: Breath of the Wild", 59.99, "Aventure", "images/zelda.jpg", "Explorez le vaste monde d'Hyrule sur votre fidèle poney"),
                new Game(2, "Cyberpunk 2077", 49.99, "RPG", "images/cyberpunk2077.jpg", "Plongez dans un futur dystopique (mais pas tant que ça) rempli de technologies avancées et de choix moraux ou immoraux"),
                new Game(3, "GTA VI", 79.99, "Action", "images/gta6.webp", "Moins bien que Wordle et le jeu précédent mais plus cher"),
                new Game(4, "God of War", 39.99, "Action", "images/god-of-war.jpg", "Incarnez Kratos dans sa quête épique à travers le nord (de la France)"),
                // 2ème ligne
                new Game(5, "World of Warcraft", 29.99, "MEUPORG", "images/wow.jpg", "Rejoignez des milliards de joueurs dans ce MEUPORG légendaire et vivez des aventures épiques dans le monde d'Azeroth"),
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

//---------------------------------gestion de l'affichage---------------------------//
class UI{
    // méthode pour afficher les jeux sur la page
    static displayGames(games){
        const listContainer = document.getElementById('game-list');
        listContainer.innerHTML = '';

        games.forEach(game => {
            const col = document.createElement('div');
            col.className = 'col';
            // création de la carte du jeu
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0"> <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    
                    <div class="card-body d-flex flex-column">
                        
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="card-title mb-0 text-truncate" style="max-width: 70%;" title="${game.title}">
                                ${game.title}
                            </h5>
                            <span class="fs-5 fw-bold text-primary text-nowrap">
                                ${game.price} €
                            </span>
                        </div>

                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-outline-dark flex-grow-1 details-btn" data-id="${game.id}">
                                <i class="bi bi-eye"></i> Voir
                            </button>
                            <button class="btn btn-success add-to-cart-btn" data-id="${game.id}">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            listContainer.appendChild(col);
        });
    }

    //méthode pour filtrer les jeux par catégorie
    static filterGames(category){
        const games = Store.getGames();
        if(category === 'All'){
            UI.displayGames(games);
        } else {
            const filteredgames = games.filter(game => game.category === category);
            UI.displayGames(filteredgames);
        }
    }

    // méthode pour configurer les boutons de catégories
    static setupCategories(){
        const games= Store.getGames();
        //on récupère les catégories uniques
        const categories = ['All', ...new Set(games.map(game => game.category))];
        const categoryContainer = document.getElementById('category-filters');

        categoryContainer.innerHTML = '';

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `btn ${cat === 'all' ? 'btn-dark' : 'btn-outline-dark'}`;
            btn.textContent = cat === 'all' ? 'Tout' : cat;
            btn.dataset.category = cat;

            btn.addEventListener('click', (e) => {
                // gestion visuelle du bouton actif 
                document.querySelectorAll('#category-filters .btn').forEach(b => {
                    b.classList.remove('btn-dark');
                    b.classList.add('btn-outline-dark');
                });
                e.target.classList.remove('btn-outline-dark');
                e.target.classList.add('btn-dark');

                // on filtre les jeux
                UI.filterGames(cat);
        });
            categoryContainer.appendChild(btn);
        });
    }

    // méthode pour ouvrir la modale des détails du jeu
    static openProductModal(gameId){
        const games = Store.getGames();
        const game = games.find(g => g.id == gameId);

        if(game){
            document.getElementById('modal-title').innerText = game.title;
            document.getElementById('modal-category').innerText = game.category;
            document.getElementById('modal-price').innerText = game.price;
            document.getElementById('modal-desc').innerText = game.description;
            document.getElementById('modal-img').src = game.image;

            // config du bouton ajouter pour savoir quel jeu ajouter
            const addBtn = document.getElementById('modal-add-btn');
            //ensuite on clone le bouton pour enlever les anciens listeners
            const newAddBtn = addBtn.cloneNode(true);
            addBtn.parentNode.replaceChild(newAddBtn, addBtn);

            newAddBtn.addEventListener('click', () => {
                myCart.addItem(game);
                //on ferme la modal après l'ajout
                const modalElement = document.getElementById('productModal');
                const modal = bootstrap.Modal.getInstance(modalElement); 
                modal.hide();
            });
            //ouvre la modale de bootstrap
            const myModal = new bootstrap.Modal(document.getElementById('productModal'));
            myModal.show();
        }
    } 

}

//-------------------initialisation et gestion événements------------------//

//panier global
const myCart = new Cart();

// événements au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    //afficher les jeux
    UI.displayGames(Store.getGames());
    UI.setupCategories();

    //  ------gestion evenements de la grille des jeux
    document.getElementById('game-list').addEventListener('click', (e) => {
        // clic 'ajouter au panier'
        if(e.target.closest('.add-to-cart-btn')){
            const btn = e.target.closest('.add-to-cart-btn');
            const id = btn.dataset.id;
            const game = Store.getGames().find(g => g.id == id);
            myCart.addItem(game);
        }

        // le clic sur 'détails"
        if(e.target.closest('.details-btn')){
            const btn = e.target.closest('.details-btn');
            const id = btn.dataset.id;
            UI.openProductModal(id);
        }
    });

    // ------------gestion evenements panier
    document.getElementById('cart-items-container').addEventListener('click', (e) => {
        // --changement quantité
        if(e.target.classList.contains('qty-btn')){
            const id = e.target.dataset.id;
            const action = e.target.dataset.action;
            const change = action === '+' ? 1 : -1;
            myCart.updateQuantity(id, change);
        }

        // --suppression
        if (e.target.classList.contains('remove-btn')){
            const btn = e.target.closest('.remove-btn');
            myCart.removeItem(btn.dataset.id);
        }
    });

    // --valider commande
    document.getElementById('validate-order').addEventListener('click', () => {
        if (myCart.items.length > 0){
            alert('Merci pour votre commande !');
            myCart.clearCart();
            //fermer la modal
            const modalElement = document.getElementById('cartModal');
            const modal = bootstrap.Modal.getInstance(modalElement); 
            modal.hide();
        } else {
            alert('Votre panier est vide.');
        }
    });

    document.getElementById('add-game-form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const title = document.getElementById('admin-title').value;
    const image = document.getElementById('admin-image').value;
    const desc = document.getElementById('admin-desc').value;
    const category = document.getElementById('admin-category').value;
    const price = document.getElementById('admin-price').value;
    
    const id = Date.now(); 
    const newGame = new Game(id, title, price, category, image, desc);
    
    Store.addGame(newGame); 
    UI.displayGames(Store.getGames()); 
    UI.setupCategories();
    
    e.target.reset();

    // Fermer la modale après l'ajout
    const modalEl = document.getElementById('adminModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    alert('Jeu ajouté avec succès !');
});
});
