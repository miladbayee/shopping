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

  textContent(text) {
    this.element.textContent = text;
    return this;
  }

  className(className) {
    this.element.className = className;
    return this;
  }

  innerHTML(htmlvalue) {
    this.element.innerHTML = htmlvalue;
    return this;
  }

  value(value) {
    this.element.value = value;
    return this;
  }

  src(link){
    this.element.src=link;
    return this;
  }

  get() {
    return this;
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
