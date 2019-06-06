const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      width: 100%;
      display: inline-block;
    }

    button {
      width: 75%;
      background: #FF7901;
      border: transparent;
      padding: 1em;
      color: #FFFFFF;
      font-size: 1em;
      font-weight: 600;
    }
  </style>
  <button>Add to Cart</button>
`;

export default class AddToCart extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }
}
