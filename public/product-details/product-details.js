import ProductPrice from './product-price.mjs';
import ProductAvailability from './product-availability.mjs';
import ProductDescription from './product-description.mjs';

customElements.define('product-price', ProductPrice);
customElements.define('product-availability', ProductAvailability);
customElements.define('product-description', ProductDescription);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <h1 id="name">Product Name</h1>
    <product-price original=4.99 sale=2.99></product-price>
    <product-availability count=4></product-availability>

    <p>
      <slot></slot>
    </p>
  </div>
`;

customElements.define('product-details', class ProductDetails extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('#name').textContent = this.name;
  }

  get price() {
    return JSON.parse(this.getAttribute('price'));
  }

  get name() {
    return this.getAttribute('name');
  }
});
