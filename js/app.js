/* Variabeles */
let itemsCounter=null;
const buyBascketBtn = document.querySelector("#buy-bascket-btn");
const closeCart = document.querySelector(".close-cart");
const cartItems=document.querySelector('.cart-items');
const clearCart=document.querySelector('#clear-cart')

Products.items.forEach((product) => {
  const productsList = document.querySelector("#products-center");
  const article = builder("article")
    .className("product")
    .appendTo(productsList);

  const divProductList = builder("div")
    .className("img-container")
    .id(`${product.sys.id}`)
    .appendTo(article);

  builder("img")
    .className("product-img")
    .src(`${product.fields.image.fields.file.url}`)
    .appendTo(divProductList);

  const addButton = builder("button")
    .className("bag-btn")
    .onclick((e) => {
      if (e.target.className === "fas fa-shopping-cart") {
        // ToDo(e.target.parentElement.parentElement.id);
      } else {
        // ToDo(e.target.parentElement.id);
      }
      itemsCounter++
      cartItems.textContent=itemsCounter
    })
    .appendTo(divProductList);

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  addButton.text("Add To Card");

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  builder("h3").text(`${product.fields.title}`).appendTo(article);
});

/*Events Listener */
buyBascketBtn.addEventListener("click", () => {
  document.querySelector(".cart-overlay").classList.add("transparentBcg");
  document.querySelector(".cart").classList.add("showCart");
});

closeCart.addEventListener("click", () => {
  document.querySelector(".cart-overlay").classList.remove("transparentBcg");
  document.querySelector(".cart").classList.remove("showCart");
});

clearCart.addEventListener('click',()=>{
  cartItems.textContent='';
  itemsCounter=null;
})


