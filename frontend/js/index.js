window.onload = function ()
{
  getProducts();
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  document.querySelector('.cart span').textContent = cart.length;
}

// Récupération des articles 

function getProducts() {
  fetch ('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(products => {
      let productscontainer = document.getElementById ("products");
      console.log (products);
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