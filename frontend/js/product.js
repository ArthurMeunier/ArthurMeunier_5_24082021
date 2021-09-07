// Récupération de l'id d'un produit

let params = new URL(document.location).searchParams;
let id = params.get("id");


window.onload = function ()
{
  getProduct();
}

// Récupération d'un produit 

function getProduct() {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(response => response.json())
    .then(product => {
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
        const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price)
        price.innerText = formatPrice;
        productinfo.appendChild(price);

        let lenseswrap = document.createElement ("div");
        lenseswrap.className = "productinfo__lenseswrap"
        productinfo.appendChild(lenseswrap);

        let lensestext = document.createElement ("div");
        lensestext.className = "productinfo__lensestext"
        lensestext.innerText = "Lentilles :";
        lenseswrap.appendChild(lensestext);

        
        let lenses = document.createElement ("select");
        lenses.className = "productinfo__lenses"
        product.lenses.forEach((lense) => {
          let option = document.createElement ("option")
          option.innerText = lense;
          lenses.appendChild(option);
        })       
        lenseswrap.appendChild(lenses);
      }
    //  console.log(product[0].price);
    })
    // .catch(function(error) {
    //   alert(error)
    // })
}


