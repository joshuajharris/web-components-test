const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      .original {
        color: cyan;
      }

      .sale {
        color: orange;
      }
    </style>
    <span class="original"></span>
    <span class="sale"></span>
  </div>
`;

customElements.define('product-price', class ProductPrice extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('.sale').textContent = this.getAttribute('sale');
    this.$('.original').textContent = this.getAttribute('original');
  }
});
