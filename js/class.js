class ProductsBasket {
  constructor(id, title, price, imgSrc) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imgSrc = imgSrc;
    this.counter = null;
  }

  counterUp() {
    this.counter += 1;
  }

  counterDown() {
    this.counter -= 1;
  }
}
