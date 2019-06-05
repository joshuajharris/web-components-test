const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        text-align: center;
      }

      .original {
        color: #888;
        font-weight: 600;
        text-decoration: line-through;
        display:block;
      }

      .sale {
        color: #000;
        font-size: 1.5em;
        display:block;
      }
    </style>
    <span class="sale"></span>
    <span class="original"></span>
  </div>
`;

export default class ProductPrice extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('.sale').textContent = this.sale;
    this.$('.original').textContent = this.original;
  }

  get sale() {
    return this.getAttribute('sale');
  }

  get original() {
    return this.getAttribute('original');
  }
}
