const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        text-align: left;
        display: inline-block;
        color: #888;
      }

      span {
        padding: 0;
        margin: 0;
      }

      .original {
        color: #888;
        font-weight: 600;
        text-decoration: line-through;
      }

      .sale {
        color: #000;
        font-size: 1.5em;
      }

      .savings {
        color: red;
      }
    </style>
    Original Price: <span class="original"></span><br/>
    Sale Price: <span class="sale"></span><br/>
    You save: <span class="savings"></span>
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
  }

  updatePrices() {
    this.$('.sale').textContent = this.sale;
    this.$('.original').textContent = this.original;

    const savings = 100 - (100 * (this.sale / this.original));
    this.$('.savings').textContent = `${Math.floor(savings)}%`;
  }

  static get observedAttributes() {
    return ['sale', 'original'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (['sale', 'original'].indexOf(name) > -1) {
      this.updatePrices();
    }
  }

  get sale() {
    return parseFloat(this.getAttribute('sale'));
  }

  get original() {
    return parseFloat(this.getAttribute('original'));
  }
}
