/* Variabeles */
let itemsCounter = null;
const buyBascketBtn = document.querySelector("#buy-bascket-btn");
const closeCart = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const clearCart = document.querySelector("#clear-cart");
const cartCcontent = document.querySelector("#cart-content");
let productItem = [];

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
        const itemId = e.target.parentElement.parentElement.id;
        Products.items.forEach((product, index) => {
          if (itemId - 1 === index) {
            const id = findId(productItem, itemId);
            if (id === -1) {
              const productId = new ProductsId(itemId);
              productId.counterUp();
              productItem.push(productId);
            } else {
              productItem[itemId - 1].counterUp();
            }
            cartCcontent.innerHTML = `
              <div class="cart-item">
                  <img src="${product.fields.image.fields.file.url}">
                  <div>
                      <h4>${product.fields.title}</h4>
                      <h5>${product.fields.price}</h5><span class="remove-item">remove</span>
                  </div>
                  <div>
                      <i class="fas fa-chevron-up"></i>
                      <p class="item-amount">0</p>
                      <i class="fas fa-chevron-down"></i>
                  </div>
              </div>
            `;
          }
        });
      } else {
        const itemId = e.target.parentElement.id;
        Products.items.forEach((product, index) => {
          if (itemId - 1 === index) {
            const id = findId(productItem, itemId);
            if (id === -1) {
              const productId = new ProductsId(itemId);
              productId.counterUp();
              productItem.push(productId);
            } else {
              productItem[itemId - 1].counterUp();
            }
            // const cartBuilder=cartItemBuilder(product.fields.image.fields.file.url,product.fields.title,product.fields.price,'0')
            cartCcontent.innerHTML = `
              <div class="cart-item">
                  <img src="${product.fields.image.fields.file.url}">
                  <div>
                      <h4>${product.fields.title}</h4>
                      <h5>${product.fields.price}</h5><span class="remove-item">remove</span>
                  </div>
                  <div>
                      <i class="fas fa-chevron-up"></i>
                      <p class="item-amount">0</p>
                      <i class="fas fa-chevron-down"></i>
                  </div>
              </div>
            `;
          }
        });
      }
      itemsCounter++;
      cartItems.textContent = itemsCounter;
      console.log(productItem);
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

clearCart.addEventListener("click", () => {
  cartItems.textContent = "";
  itemsCounter = null;
  cartCcontent.innerHTML = "";
});

/* Functions */
function cartItemBuilder(imgSrc, title, price, count) {
  `
    <div class="cart-item">
        <img src="${imgSrc}">
        <div>
            <h4>${title}</h4>
            <h5>${price}</h5><span class="remove-item">remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up"></i>
            <p class="item-amount">${count}</p>
            <i class="fas fa-chevron-down"></i>
        </div>
    </div>
  `;
}

const findId = (array, id) => {
  return array.findIndex((item) => item.id === id);
};
