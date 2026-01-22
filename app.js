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

    //méthode qui retourne le prix formaté
    getFormattedPrice() {
        return this.price.toFixed(2) + " €";
    }
}

// Classe Store pour gérer les jeux disponibles en Local Storage
// pour simuler une base de données
class Store{
    // méthode pour récuperer les jeux depuis le local storage
    static getGames() {
        let games;
        if(localStorage.getItem("games") === null){
            // Les données par défaut pour le site puisqu'il n'y a pas encore de jeux en Local Storage
            // note: je sépare volontairement avec un commentaire les données tous les 5 jeux pour refléter l'affichage du site
            games = [
                // La première ligne de jeux
                new Game(1, "PowerWash Simulator 2", 49.99, "Simulation", "images/power2.jpg", "Devenez le maître du nettoyage haute pression dans ce jeu de simulation relaxant, satisfaisant mais pas très économique en eau"),
                new Game(2, "Cyberpunk 2077", 49.99, "RPG", "images/cyberpunk2077.jfif", "Plongez dans un futur dystopique mais pas tant que ça et rempli de technologies avancées (comme le GPS ou bien les cartes perforées) et de choix moraux ou immoraux"),
                new Game(3, "GTA VI", 129.99, "Action", "images/gta6.jpg", "Après des années d'attente et un budget plus important que le PIB de certains pays, GTA VI s'avère être moins bien que Wordle mais bien plus cher !"),
                new Game(4, "Baldur's Gate 3", 59.99, "RPG", "images/bd3.jpg", "Plongez dans une aventure épique dans les Royaumes Oubliés avec des choix qui façonnent votre destin grâce a Dédé"),
                new Game(5, "Groenland: Le Jeu", 999.99, "MEUPORG", "images/groenland.jpg", "Mettez tout en oeuvre pour acheter le Groenland dans ce MEUPORG révolutionnaire, utilisez la ruse, l'intimidation ainsi que les droits de douanes pour convaincre les autres pays de vous laisser l'acheter!"),
                // 2ème ligne
                new Game(6, "Wasteland 3", 39.99, "RPG", "images/wasteland3.avif", "Explorez un monde post-apocalyptique rempli de dangers et de choix moraux dans ce RPG tactique au tour par tour"),
                new Game(7, "Fallout 3", 49.99, "RPG", "images/fallout3.webp", "Explorez les ruines de Washington D.C. dans ce RPG post-apocalyptique remplis de bugs mais acclamé par la critique et les personnes de bon goût"),
                new Game(8, "Starfield", 69.99, "RPG", "images/starfield.jpg", "Explorez les confins de l'espace dans ce RPG épique de Bethesda, où chaque étoile cache une nouvelle aventure procédurale et pas forcément très intéressante"),
                new Game(9, "Oblivion Remastered", 19.99, "RPG", "images/oblivion.jpg", "Redécouvrez le classique RPG d'Oblivion avec des graphismes améliorés et du contenu supplémentaire, le tout bien évidemment pas du tout optimisé sur PC"),
                new Game(10, "The Outer Worlds 2", 59.99, "RPG", "images/outerworlds2.jpg", "Plongez dans un univers de science-fiction rempli d'humour noir et de choix moraux dans ce RPG captivant"),
                // 3ème ligne
                new Game(11, "The Witcher 3: Wild Hunt", 39.99, "RPG", "images/witcher3.jpg", "Incarnez Geralt de Riv, un chasseur de monstres solitaire, dans un monde ouvert riche en quêtes et en choix moraux"),
                new Game(12, "The Legend of Zelda: Breath of the Wild", 59.99, "Aventure", "images/zelda.jpg", "Explorez le vaste monde d'Hyrule sur votre fidèle poney 'Cacahuète' et sauvez la princesse Zelda des terribles griffes de l'infâme John Snow"),
                new Game(13, "Red Dead Redemption 2", 59.99, "Aventure", "images/rdr2.jpg", "Plongez dans l'Ouest sauvage américain avec Arthur Morgan et la bande de Dutch van der Linde et affrontez votre pire ennemi: les arbres!"),
                new Game(14, "God of War", 39.99, "Action", "images/god-of-war.webp", "Incarnez Kratos dans sa quête épique à travers le nord (de la France) avec son fils Atreus pour conquérir la mairie de Dunkerque"),
                new Game(15, "World of Warcraft", 29.99, "MEUPORG", "images/wow.webp", "Rejoignez des centaines de milliards de joueurs dans ce MEUPORG légendaire et vivez des aventures épiques dans le monde d'Azeroth"),     
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
            cartContainer.innerHTML = '<p class="text-center text-muted"> Votre panier est vide!</p>';
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
    static displayGames(games) {
        const listContainer = document.getElementById('game-list');
        listContainer.innerHTML = '';

        games.forEach(game => {
            const col = document.createElement('div');
            col.className = 'col';  
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0 game-card" data-id="${game.id}">
                    
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    
                    <div class="card-body d-flex flex-column p-3">
                        
                        <div class="mb-0">
                            <h4 class="card-title text-dark" title="${game.title}">
                                ${game.title}
                            </h4>
                            </div>

                        <div class="mt-auto d-flex justify-content-between align-items-end">
                            
                            <div class="d-flex flex-column">
                                <small class="text-muted" style="font-size: 1rem;">Prix</small>
                                <span class="price-tag lh-1">
                                    ${game.getFormattedPrice ? game.getFormattedPrice() : game.price + ' €'}
                                </span>
                            </div>

                            <button class="btn btn-primary btn-square shadow-sm add-to-cart-btn" data-id="${game.id}">
                                <i class="bi bi-cart-plus-fill fs-5"></i>
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
        if(category === 'all'){
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
        const categories = ['all', ...new Set(games.map(game => game.category))];
        const categoryContainer = document.getElementById('category-filters');

        categoryContainer.innerHTML = '';

        categories.forEach(cat => {
            const btn = document.createElement('button');
            //si la catégorie est 'all' on met le bouton en foncé sinon avec une bordure
            btn.className = `btn ${cat === 'all' ? 'btn-dark' : 'btn-outline-dark'}`;
            btn.textContent = cat === 'all' ? 'Tout' : cat;
            //on ajoute un attribut au bouton pour connaitre sa categorie
            btn.dataset.category = cat;

            btn.addEventListener('click', (e) => {
                // -------gestion visuelle du bouton actif ---------
                //d'abord on remet tous les bouton inactifs
                document.querySelectorAll('#category-filters .btn').forEach(b => {
                    b.classList.remove('btn-dark');
                    b.classList.add('btn-outline-dark');
                });
                // puis on met en actif le bouton qui a été cliqué en iinversant les classes
                e.target.classList.remove('btn-outline-dark');
                e.target.classList.add('btn-dark');

                // après on filtre les jeux
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
            //remplir le contenu de la modale
            document.getElementById('modal-title').innerText = game.title;
            const catBadge = document.getElementById('modal-category');
            if(catBadge) catBadge.innerText = game.category;
            document.getElementById('modal-price').innerText = game.getFormattedPrice();
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
            //botun acheter maintenant
            const buyBtn = document.getElementById('modal-buy-btn');
            if (buyBtn){
                const newBuyBtn = buyBtn.cloneNode(true);
                buyBtn.parentNode.replaceChild(newBuyBtn, buyBtn);

                newBuyBtn.addEventListener('click', () => {
                    alert(`Merci pour votre achat de "${game.title}" pour ${game.price} €`);
                    
                const modalElement = document.getElementById('productModal');
                const modal = bootstrap.Modal.getInstance(modalElement); 
                modal.hide();
            });
        }
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

    //  ------gestion evenements de la grille des jeux----------
    document.getElementById('game-list').addEventListener('click', (e) => {
        // clic 'ajouter au panier'
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            const id = addBtn.dataset.id;
            const game = Store.getGames().find(g => g.id == id);
            myCart.addItem(game);
            return; 
        }

        const card = e.target.closest('.game-card');
        if (card) {
            const id = card.dataset.id; 
            UI.openProductModal(id);
        }
    });

    // ------------gestion evenements panier-----------
    document.getElementById('cart-items-container').addEventListener('click', (e) => {
        // --changement quantité
        if(e.target.classList.contains('qty-btn')){
            const id = e.target.dataset.id;
            const action = e.target.dataset.action;
            const change = action === '+' ? 1 : -1;
            myCart.updateQuantity(id, change);
        }

        // --suppression
        if (e.target.closest('.remove-btn')){
            const btn = e.target.closest('.remove-btn');
            myCart.removeItem(btn.dataset.id);
        }
    });

    // --valider la commande
    document.getElementById('validate-order').addEventListener('click', () => {
        if (myCart.items.length > 0){
            alert('Merci pour votre commande !');
            // ajout prix total dans une alerte
            const totalPrice = myCart.getTotal().toFixed(2);
            alert(`Commande validé! Total: ${totalPrice} €`);
            //vider le panier
            myCart.clearCart();
            //fermer la modal
            const modalElement = document.getElementById('cartModal');
            const modal = bootstrap.Modal.getInstance(modalElement); 
            modal.hide();
        } else {
            alert('Votre panier est vide !');
        }
    });
        // ------------gestion evenements admin-----------
        //pour l'ajout d'un nouveau jeu
        document.getElementById('add-game-form').addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const title = document.getElementById('admin-title').value;
        const image = document.getElementById('admin-image').value;
        const desc = document.getElementById('admin-desc').value;
        const category = document.getElementById('admin-category').value;
        const price = Number.parseFloat(document.getElementById('admin-price').value);
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

        alert(`Jeu "${title}" ajouté avec succès !`);
    });

    // ------------gestion evenements connexion qui est juste simulé pour le moment-----------
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const modalEl = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        alert('Connexion réussie ! (Fictif)');
    });
});
