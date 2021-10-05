// Au lancement de la page, on déclenche la fonction "GetProducts" //
window.onload = function ()
{
  getProducts();
  // Lecture du panier à partir du LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  // Afficher le nombre d'articles présents dans le panier
  document.querySelector('.cart span').textContent = cart.length;
}

// Récupération des articles 

function getProducts() {
  // On appelle l'API
  fetch ('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(products => {
      let productscontainer = document.getElementById ("products");
      // On affiche les produits récupérés
      products.forEach((product) => {

        let a = document.createElement("a");
        a.href = `product.html?id=${product._id}`;
        a.className = "product";
        productscontainer.appendChild(a);

        let img = document.createElement ("img");
        img.className = "product__img";
        img.src = product.imageUrl;
        a.appendChild(img);

        let title = document.createElement ("div");
        title.className = "product__title"
        title.innerText = product.name;
        a.appendChild(title);

        let price = document.createElement ("div");
        price.className = "product__price"
        // On adapte le prix au format €
        const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100)
        price.innerText = formatPrice;
        a.appendChild(price);
      })
      {
      }
    })
    .catch(function(errormessage) {
      let error = document.createElement ("span");
      error.className = "error";
      error.innerText = errormessage;
      productscontainer.appendChild(error);
    })
}