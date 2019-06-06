const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <h2>Recommended Products</h2>
  </div>
`;

customElements.define('recommended-products', class RecommendedProducts extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }
});
