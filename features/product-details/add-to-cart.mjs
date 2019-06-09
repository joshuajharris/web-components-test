const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      width: 100%;
      display: inline-block;
    }

    button {
      width: 75%;
      background: var(--orange-color);
      border: transparent;
      padding: 1em;
      color: #FFFFFF;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
    }

    @media (max-width: 650px) {
      button {
        width: 100%;
      }
    }

    button:hover {
      background: orange;
    }

    .has-added {
      background: #CCC;
      color: #888;
    }

    .has-added:hover {
      color: #CCC;
      background: #888;
    }
  </style>
  <button>\u{002B} Add to Cart</button>
`;

export default class AddToCart extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('button').addEventListener('click', () => {
      this.$('button').classList.add('has-added');
      this.$('button').textContent = '\u{02713} Item added to Cart';
      this.$('button').disabled = true;
    });
  }
}
