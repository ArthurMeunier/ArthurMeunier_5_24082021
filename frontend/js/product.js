// Récupération de l'id d'un produit

let params = new URL(document.location).searchParams;
let id = params.get("id");

window.onload = function ()
{
  getProduct();
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  document.querySelector('.cart span').textContent = cart.length;
}

// On créé la variable globale pour y accéder de partout

let currentproduct = null;

// Récupération d'un produit et affichage des données

function getProduct() {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(response => response.json())
    .then(product => {
      currentproduct = product;
      let productinfo = document.querySelector (".productinfo");
      {

        let img = document.createElement ("img");
        img.className = "productinfo__img";
        img.src = product.imageUrl;
        productinfo.appendChild(img);

        let title = document.createElement ("div");
        title.className = "productinfo__title";
        title.innerText = product.name;
        productinfo.appendChild(title);

        let description = document.createElement ("div");
        description.className = "productinfo__description"
        description.innerText = product.description;
        productinfo.appendChild(description);

        let price = document.createElement ("div");
        price.className = "productinfo__price"
        const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price/100)
        price.innerText = formatPrice;
        productinfo.appendChild(price);

        let lensewrap = document.createElement ("div");
        lensewrap.className = "productinfo__lensewrap";
        productinfo.appendChild(lensewrap);

        let lensetext = document.createElement ("div");
        lensetext.className = "productinfo__lensetext";
        lensetext.innerText = "Lentille :";
        lensewrap.appendChild(lensetext);
  
        let lenses = document.createElement ("select");
        lenses.id = "lensesselect";
        lenses.className = "productinfo__lenses";
        product.lenses.forEach((lense) => {
          let option = new Option(lense, lense);
          lenses.options.add(option);
        })       
        lensewrap.appendChild(lenses);
      }
    })
    .catch(function(error) {
      alert(error)
    })
}


// add items to cart




// 
//   onLoadCartNumbers();
// }



function addtocart() {
  // Lire le contenu du local storage et le sortir en array sous forme de Json
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart==null) {
    cart=[];
  }

  // On crée l'objet ajouté au panier
  let cartProduct = {
    id: currentproduct._id,
    name: currentproduct.name,
    price: currentproduct.price,
    option: document.getElementById("lensesselect").value
  };

  // On ajoute l'objet créé au panier
  cart.push(cartProduct);


// On sauvegarde le panier dans local storage sous forme de string
localStorage.setItem("cart", JSON.stringify(cart));
document.querySelector('.cart span').textContent = cart.length;
}