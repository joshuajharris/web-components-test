const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        color: #FF0000;
        display: inline-block;
      }
    </style>
    Gallery
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
  }
});
