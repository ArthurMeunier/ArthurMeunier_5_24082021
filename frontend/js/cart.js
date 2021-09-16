window.onload = function ()
{
  document.querySelector('.cart span').textContent = cart.length;
  if (cart.length === 0) {
    document.querySelector("#cart__empty").style.display = "none";
    document.getElementById("cartcontainer").style.display = "none";
    document.getElementById("formcontainer").style.display = "none";
    document.getElementById("cart__total").style.display = "none";
  }
}
// Récupération des items du localstorage
let cart = JSON.parse(localStorage.getItem('cart'));
if (cart === null) {
  cart = [];
}

const cartlist = document.querySelector("#cart__list");
const cartlistitem = document.querySelector(".cart__item");
const carttotal = document.querySelector("#cart__total");

let cartitem = [];

if(cart === null){
// Si le panier est vide
let emptycart = `Le panier est vide`;
cartlist.innerHTML = emptycart; 
} else {
// Si le panier n'est pas vide
  displayCart();
}

// Afficher les objets du panier
function displayCart() {
  let cartitem = document.getElementById ("cart__list");
  cartitem.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];

    let itemdiv = document.createElement ("div");
    itemdiv.className = "cart__item"
    cartitem.appendChild(itemdiv);
    
    let name = document.createElement ("div");
    name.className = "cart__name"
    name.innerText = item.name;
    itemdiv.appendChild(name);

    let option = document.createElement ("div");
    option.className = "cart__option";
    option.innerText = item.option;
    itemdiv.appendChild(option);

    let price = document.createElement ("div");
    price.className = "cart__price"
    const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price/100)
    price.innerText = formatPrice;
    itemdiv.appendChild(price);

    let del = document.createElement ("div");
    del.className = "cart__delete"
    let delicon = document.createElement ("i");
    delicon.className = "fas fa-trash-alt";
    delicon.setAttribute("onclick", "removeItem("+i+")");
    del.appendChild(delicon);
    itemdiv.appendChild(del);

    
  }
  if (cart.length === 0) {
    // Si le panier est vide, on cache le bouton "Vider le panier"
    document.querySelector("#cart__empty").style.display = "none";
    document.getElementById("form").style.display = "none";

  }
}

// Vider le panier

const emptyCart = document.querySelector("#cart__empty");
emptyCart.addEventListener("click", () => {
  localStorage.clear();
  cart = [];
  document.querySelector('.cart span').textContent = cart.length;
  document.getElementById ("cart__list").innerHTML = "";
  document.querySelector("#cart__empty").style.display = "none";
});

// Supprimer un objet du panier
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector('.cart span').textContent = cart.length;
  displayCart();
  carttotal.innerHTML = displayTotalPrice;
}


// Prix total du panier

let priceCalc = [];

// Chercher les prix des produits dans le panier
for (let t = 0 ; t < cart.length; t++) {
  let itemprice = cart[t];
  console.log(itemprice.price)
// Injecter les prix dans la variable du prix total
  priceCalc.push(itemprice.price)
  console.log(priceCalc)
}


// Additioner les prix

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = (priceCalc.reduce(reducer,0))/100;
const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice)


console.log(totalPrice);


// Afficher le prix total



const displayTotalPrice = `
<span class="cart__textprice">Total : </span><span class="cart__totalprice">${formatPrice}</span>
`;


carttotal.innerHTML = displayTotalPrice;
