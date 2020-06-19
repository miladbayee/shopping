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
        console.log(e.target.parentElement.parentElement.id);
      } else {
        console.log(e.target.parentElement.id);
      }
    })
    .appendTo(divProductList);

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  addButton.textContent("Add To Card");

  builder("i").className("fas fa-shopping-cart").appendTo(addButton);

  builder("h3").textContent(`${product.fields.title}`).appendTo(article);
});
