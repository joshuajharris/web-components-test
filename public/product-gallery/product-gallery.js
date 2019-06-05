import ProductImage from './product-image.mjs';

customElements.define('product-image', ProductImage);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        color: #FF0000;
        display: inline-block;
        flex-basis: 50%;
      }
    </style>
    <div id="container">
      <div id="current"></div>
      <div id="previews"></div>
    </div>
  </div>
`;

customElements.define('product-gallery', class ProductGallery extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.updateContainer();
  }

  updateContainer() {
    const [first, ...rest] = this.filepaths.map(
      path => `<product-image filepath="${path}"></product-image>`,
    );

    this.$('#current').innerHTML = first;
    this.$('#previews').innerHTML = rest;
  }

  get filepaths() {
    return JSON.parse(this.getAttribute('images'));
  }
});
