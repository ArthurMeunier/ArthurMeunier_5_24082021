function displayOrderIdAndPrice() {
  const priceConfirm = document.querySelector("#confirm__price");
  const orderId = document.querySelector("#confirm__orderid");
  
  priceConfirm.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");
}

displayOrderIdAndPrice();