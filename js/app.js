/* Variabeles */
let itemsCounter = null;
const buyBascketBtn = document.querySelector("#buy-bascket-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const clearCartBtn = document.querySelector("#clear-cart");
const cartContent = document.querySelector("#cart-content");
let selectProduct = [];

//add products data from json file to DOM
Products.items.forEach((product) => {
  const productsList = document.querySelector("#products-center");
  const btnInnerHTML = `
            <i class='fas fa-shopping-cart' data-id=${product.sys.id}></i>
            Add To Card
            <i class='fas fa-shopping-cart' data-id=${product.sys.id}></i>
          `;
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
    .dataId(`${product.sys.id}`)
    .innerHtml(btnInnerHTML)
    .onclick((e) => {
      const itemId = e.target.dataset.id;
      cartContent.innerHTML = "";
      Products.items.forEach((product, index) => {
        const title = product.fields.title;
        const price = product.fields.price;
        const imgSrc = product.fields.image.fields.file.url;
        if (itemId - 1 === index) {
          const id = findId(selectProduct, itemId);
          if (id === -1) {
            const productBasket = new ProductsBasket(
              itemId,
              title,
              price,
              imgSrc
            );
            productBasket.counterUp();
            selectProduct.push(productBasket);
          } else {
            selectProduct[id].counterUp();
          }
        }
      });
      selectProduct.forEach((product) => {
      creatCartItem(product);
      });
      cartItems.textContent = countItems(selectProduct);
      totalPrice(selectProduct);
    })
    .appendTo(divProductList);
  builder("h3").text(`${product.fields.title}`).appendTo(article);
});

/* Functions */

//build cart item document selected from products list
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

//find products id
const findId = (array, id) => {
  return array.findIndex((item) => item.id === id);
};

//function add product from list to cart items
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
  span.dataset.id = `${product.id}`;
  span.onclick = (e) => {
    const getId = e.target.dataset.id;
    selectProduct.forEach((item, index) => {
      if (item.id === getId) {
        e.target.parentElement.parentElement.remove();
        selectProduct.splice(index, 1);
        totalPrice(selectProduct);
       cartItems.textContent =countItems(selectProduct)
      }
    });
  };
  divTitle.appendChild(span);
  cartItemElement.appendChild(divTitle);

  const divCounter = document.createElement("div");
  divCounter.dataset.id = `${product.id}`;

  const iElementUp = document.createElement("i");
  iElementUp.className = "fas fa-chevron-up";
  iElementUp.onclick = (e) => {
    const getId = e.target.parentElement.dataset.id;
    selectProduct.forEach((item) => {
      if (item.id === getId) {
        item.counter++;
        pElementAmount.textContent = `${product.counter}`;
      }
      cartItems.textContent = countItems(selectProduct);
    });
    totalPrice(selectProduct);
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
    selectProduct.forEach((item, index) => {
      if (item.id === getId) {
        item.counter--;
        if (item.counter > 0) {
          pElementAmount.textContent = `${product.counter}`;
        } else {
          e.target.parentElement.parentElement.remove();
          selectProduct.splice(index, 1);
        }
      }
    });
    cartItems.textContent = countItems(selectProduct);
    totalPrice(selectProduct);
  };

  divCounter.appendChild(iElementDown);

  cartItemElement.appendChild(divCounter);
  cartContent.appendChild(cartItemElement);
}

//calculator select products price in cart items
function totalPrice(products) {
  const totalPrice = document.querySelector("#total-price");
  let calculatroPrice = null;
  products.forEach((item) => {
    return (calculatroPrice += item.price * item.counter);
  });
  if (calculatroPrice > 0) {
    totalPrice.textContent = calculatroPrice;
  } else {
    totalPrice.textContent = "";
  }
}

//Count the number select products
function countItems(array) {
  let counter = null;
  array.forEach((item) => {
    counter += item.counter;
  });
  return counter;
}


/*Events Listener */

//add event to backet button
buyBascketBtn.addEventListener("click", () => {
  document.querySelector(".cart-overlay").classList.add("transparentBcg");
  document.querySelector(".cart").classList.add("showCart");
});

//add event to close button in cart overlay
closeCartBtn.addEventListener("click", () => {
  document.querySelector(".cart-overlay").classList.remove("transparentBcg");
  document.querySelector(".cart").classList.remove("showCart");
});

// clear all items for cart overlay
clearCartBtn.addEventListener("click", () => {
  const totalPrice = document.querySelector("#total-price");
  selectProduct = [];
  cartItems.textContent = cartItems.textContent = countItems(selectProduct);
  cartContent.innerHTML = "";
  totalPrice.textContent = "";
});

