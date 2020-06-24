/* Variabeles */
let itemsCounter = null;
const buyBascketBtn = document.querySelector("#buy-bascket-btn");
const closeCart = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const clearCart = document.querySelector("#clear-cart");
const cartContent = document.querySelector("#cart-content");
let productBasket;
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
        cartContent.innerHTML = "";
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        const itemId = e.target.parentElement.parentElement.id;
        Products.items.forEach((product, index) => {
          const title = product.fields.title;
          const price = product.fields.price;
          const imgSrc = product.fields.image.fields.file.url;
          if (itemId - 1 === index) {
            const id = findId(productItem, itemId);
            if (id === -1) {
              productBasket = new ProductsBasket(itemId, title, price, imgSrc);
              productBasket.counterUp();
              productItem.push(productBasket);
            } else {
              productItem[id].counterUp();
            }
          }
        });
        productItem.forEach((product) => {
          creatCartItem(product);
        });
      } else {
        const itemId = e.target.parentElement.id;
        cartContent.innerHTML = "";
        Products.items.forEach((product, index) => {
          const title = product.fields.title;
          const price = product.fields.price;
          const imgSrc = product.fields.image.fields.file.url;
          if (itemId - 1 === index) {
            const id = findId(productItem, itemId);
            if (id === -1) {
              productBasket = new ProductsBasket(itemId, title, price, imgSrc);
              productBasket.counterUp();
              productItem.push(productBasket);
            } else if (id !== -1) {
              productItem[id].counterUp();
            }
            // const cartBuilder=cartItemBuilder(product.fields.image.fields.file.url,product.fields.title,product.fields.price,'0')
          }
        });
        productItem.forEach((product) => {
          creatCartItem(product);
        });
      }
      itemsCounter++;
      cartItems.textContent = itemsCounter;
      totalPrice(productItem);
    })
    .appendTo(divProductList);

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  addButton.text("Add To Card");

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  builder("h3").text(`${product.fields.title}`).appendTo(article);
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

//Add product to cart item
function creatCartItem(product) {
  const cartItemElement = document.createElement("div");
  cartItemElement.className = "cart-item";

  const img = document.createElement("img");
  img.src = `${product.imgSrc}`;
  cartItemElement.appendChild(img);

  const divTitle = document.createElement("div");

  const h4 = document.createElement("h4");
  h4.textContent = `${product.title}`;
  divTitle.appendChild(h4);

  const h5 = document.createElement("h5");
  h5.textContent = `${product.price}`;
  divTitle.appendChild(h5);
  const span = document.createElement("span");

  span.textContent = "remove";
  span.className = "remove-item";
  divTitle.appendChild(span);
  cartItemElement.appendChild(divTitle);

  const divCounter = document.createElement("div");
  divCounter.dataset.id = `${product.id}`;

  const iElementUp = document.createElement("i");
  iElementUp.className = "fas fa-chevron-up";
  iElementUp.onclick = (e) => {
    const getId = e.target.parentElement.dataset.id;
    productItem.forEach((item) => {
      if (item.id === getId) {
        item.counter++;
        itemsCounter++;
        cartItems.textContent = itemsCounter;
        pElementAmount.textContent = `${product.counter}`;
      }
    });
    totalPrice(productItem);
  };
  divCounter.appendChild(iElementUp);

  const pElementAmount = document.createElement("p");
  pElementAmount.className = "item-amount";
  pElementAmount.textContent = `${product.counter}`;
  divCounter.appendChild(pElementAmount);

  const iElementDown = document.createElement("i");
  iElementDown.className = "fas fa-chevron-down";
  iElementDown.onclick = (e) => {
    const getId = e.target.parentElement.dataset.id;
    productItem.forEach((item) => {
      if (item.id === getId) {
        item.counter--;
        if (item.counter > 0) {
          itemsCounter--;
          cartItems.textContent = itemsCounter;
          pElementAmount.textContent = `${product.counter}`;
        } else {
          itemsCounter--;
          e.target.parentElement.parentElement.innerHTML = "";
          if (itemsCounter > 0) {
            cartItems.textContent = itemsCounter;
          } else {
            cartItems.textContent = "";
          }
        }
      }
    });
    totalPrice(productItem);
  };

  divCounter.appendChild(iElementDown);

  cartItemElement.appendChild(divCounter);
  cartContent.appendChild(cartItemElement);
}

function totalPrice(products) {
  const totalPrice = document.querySelector("#total-price");
  let calcPrice = null;
  products.forEach((item) => {
   return calcPrice += item.price * item.counter;
  });
  if(calcPrice>0){
    totalPrice.textContent = calcPrice;
  }
  else{
    totalPrice.textContent = '';
  }
  
}

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
  cartContent.innerHTML = "";
});
