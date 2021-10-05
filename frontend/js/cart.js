let cart = JSON.parse(localStorage.getItem('cart'));
if (cart === null) {
  cart = [];
}

window.onload = function () {
  document.querySelector('.cart span').textContent = cart.length;
}

// Cacher les informations non nécessaires quand le panier est vide
function hideCartIfEmpty() {
  document.querySelector("#cart__empty").style.display = "none";
  document.getElementById("cartcontainer").style.display = "none";
  document.getElementById("formcontainer").style.display = "none";
  document.getElementById("cart__total").style.display = "none";
  document.getElementById("cartempty").style.display = "flex";
  // Si le panier est vide
  let emptycart = `Le panier est vide`;
  cartlist.innerHTML = emptycart;
}

// Contenu de la page affichée lorsque le panier est vide
function emptyPage() {
  let divempty = document.getElementById("cartempty");
  let emptydiv = document.createElement("div");
  emptydiv.className = "cart__isempty"
  divempty.appendChild(emptydiv);
}

// Définition des points d'injection dans le HTML
const cartlist = document.querySelector("#cart__list");
const cartlistitem = document.querySelector(".cart__item");
const carttotalprice = document.querySelector("#cart__totalprice");


// Afficher les objets du panier
function displayCart() {
  cartlist.innerHTML = "";
  // Récupération des items stockés dans le localStorage
  if (cart.length == 0) {
    // Cacher le panier si besoin
    hideCartIfEmpty();
  }
  else {
    document.getElementById("cartempty").style.display = "none";
    // On affiche le contenu de local storage sur la page
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];

      let itemdiv = document.createElement("div");
      itemdiv.className = "cart__item"
      cartlist.appendChild(itemdiv);

      let name = document.createElement("a");
      name.setAttribute('href', `product.html?id=${item.id}`);
      name.className = "cart__name"
      name.innerText = item.name;
      itemdiv.appendChild(name);

      let option = document.createElement("div");
      option.className = "cart__option";
      option.innerText = item.option;
      itemdiv.appendChild(option);

      let price = document.createElement("div");
      price.className = "cart__price"
      const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price / 100)
      price.innerText = formatPrice;
      itemdiv.appendChild(price);

      let del = document.createElement("div");
      del.className = "cart__delete"
      let delicon = document.createElement("i");
      delicon.className = "fas fa-trash-alt";
      delicon.setAttribute("onclick", "removeItem(" + i + ")");
      del.appendChild(delicon);
      itemdiv.appendChild(del);
    }
    // On recalcule le prix total
    refreshTotal();
  }
}

displayCart();


// Vider le panier

const emptyCart = document.querySelector("#cart__empty");
emptyCart.addEventListener("click", () => {
  let result = confirm("Voulez-vous vraiment vider le panier?");
  if (result) {
    // On vide le localStorage
    localStorage.clear();
    // On cache la zone d'affichage du panier
    cart = [];
    document.querySelector('.cart span').textContent = cart.length;
    document.getElementById("cart__list").innerHTML = "";
    document.querySelector("#cart__empty").style.display = "none";
    hideCartIfEmpty();
    // On montre la zone d'affichage du panier
    document.getElementById("cartempty").style.display = "flex";
  }
});


// Supprimer un objet du panier
function removeItem(index) {
  // On enlève un produit du array cart avec "splice"
  cart.splice(index, 1);
  // On sauvegarde le panier modifié dans le localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  // On met à jour le nombre de produit dans le header
  document.querySelector('.cart span').textContent = cart.length;
  displayCart();
}

function refreshTotal() {
  // Prix total du panier

  let totalPrice = 0;
  // Chercher les prix des produits dans le panier
  for (let t = 0; t < cart.length; t++) {
    let item = cart[t];
    totalPrice = totalPrice + item.price;
  } 

  // Additioner les prix
  const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice / 100);
  // Afficher le prix total
  carttotalprice.innerHTML = formatPrice;
}


// Selection dans le DOM

let formbtn = document.getElementById("form__submit");
let inputName = document.getElementById("name");
let inputLastName = document.getElementById("lastname");
let inputAdress = document.getElementById("address");
let inputPostal = document.getElementById("zip");
let inputCity = document.getElementById("city");
let inputMail = document.getElementById("mail");
let inputPhone = document.getElementById("phone");

// Au clic sur "Commander", on vérifie et si la validation est bonne, on envoie les données
// Le formulaire valide automatiquement le contenu avec "required" et "input type="email""
function sendForm() {
  // On prépare les données à envoyer à l'API : formulaire
  const datatosend = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      city: inputCity.value,
      address: inputAdress.value,
      email: inputMail.value,
    },
    products: [],
  };

  // On prépare les données à envoyer à l'API : panier
  cart.forEach(item => {
    datatosend.products.push(item.id);
  });

  // Préparation du prix formaté pour l'afficher sur la prochaine page
  const carttotalprice = document.querySelector("#cart__totalprice");

  let priceConfirm = document.querySelector("#cart__totalprice").innerText;

  // Appel de l'API, on envoie les données
  const senddata = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(datatosend),
    headers: { 
    "Content-Type": "application/json",
    },
  }).then(response => response.json())
    .then(order => {
      localStorage.clear();
      localStorage.setItem("orderId", order.orderId);
      localStorage.setItem("total", priceConfirm);
      // On renvoie le visiteur à la page de confirmatino
      window.location.href="confirm.html?orderId="+order.orderId;
  });
  // On empêche l'action "submit" | On a besoin que le formulaire enclenche l'action submit pour valider les donnéees
  return false;
}