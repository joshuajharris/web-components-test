const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 75%;
      margin: 0 auto;
      font-size: 0.5em;
    }

    button {
      padding: 1em 2em 1em 2em;
      background: var(--orange-color);
      color: #FFFFFF;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
  Title: <b><slot name="title"></slot></b>
  Price: <b><slot name="price"></slot></b>
  <button>&times;</button>
`;

export default class ShoppingCartItem extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('remove-item', {
        detail: {
          index: this.index,
        },
      }));
    });
  }

  get index() {
    return parseInt(this.getAttribute('index'), 10);
  }
}
