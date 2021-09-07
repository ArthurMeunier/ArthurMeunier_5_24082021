window.onload = function ()
{
  getProducts();
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
        price.innerText = `${product.price} €`;
        a.appendChild(price);

      })
      {
      }
    })
    .catch(function(error) {
      alert(error)
    })
}


