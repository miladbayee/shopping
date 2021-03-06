class ElementBuilder {
  constructor(elementName) {
    this.element = document.createElement(elementName);
  }

  appendTo(parent) {
    if (parent instanceof ElementBuilder) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    return this;
  }

  text(text) {
    this.element.textContent = text;
    return this;
  }

  className(className) {
    this.element.className = className;
    return this;
  }

  id(id){
    this.element.id=id;
    return this
  }

  innerHtml(htmlvalue) {
    this.element.innerHTML = htmlvalue;
    return this;
  }

  value(value) {
    this.element.value = value;
    return this;
  }

  dataId(value){
    this.element.dataset.id=value;
    return this;
  }

  src(link){
    this.element.src=link;
    return this;
  }

  onclick(fun){
    this.element.onclick=fun;
    return this
  }

}

// const builder = {
//   create: name => {
//     return new ElementBuilder(name);
//   },
// };

const builder = (name) => {
  return new ElementBuilder(name);
};
