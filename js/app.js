const productsList = document.querySelector("#products-list");

const divTag= builder('div').appendTo(productsList)
 builder("p").textContent("this is test").class('class-test').appendTo(divTag)
