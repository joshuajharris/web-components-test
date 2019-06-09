import ProductPrice from './product-price.mjs';
import ProductAvailability from './product-availability.mjs';
import ProductDescription from './product-description.mjs';
import AddToCart from './add-to-cart.mjs';

customElements.define('product-price', ProductPrice);
customElements.define('product-availability', ProductAvailability);
customElements.define('product-description', ProductDescription);
customElements.define('add-to-cart', AddToCart);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
    }

    .flex-grow-1 {
      flex-grow: 1;
    }
  </style>

  <h1 id="title">Product Title</h1>

  <product-price></product-price>

  <product-description><slot></slot></product-description>

  <product-availability class="flex-grow-1" count=4></product-availability>

  <add-to-cart class="flex-grow-1"></add-to-cart>
`;

customElements.define('product-details', class ProductDetails extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('product-price').setAttribute('sale', this.price.sale);
    this.$('product-price').setAttribute('original', this.price.original);

    this.$('#title').textContent = this.title;

    this.$('add-to-cart').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        detail: {
          title: this.title,
          price: this.price.sale,
        },
      }));
    });
  }

  get title() {
    return this.getAttribute('title');
  }

  get price() {
    return JSON.parse(this.getAttribute('price'));
  }
});
