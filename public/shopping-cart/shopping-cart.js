import ShoppingCartItem from './cart-item.mjs';

customElements.define('shopping-cart-item', ShoppingCartItem);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    button {
      background: transparent;
      border: none;
      font-size: 1em;
      cursor: pointer;
    }

    button:hover {
      color: orange;
    }

    #cart {
      height: 100%;
      width: 50%;
      position: fixed;
      background: #FFF;
      top: 0;
      right: -50%;
      z-index: 100;
      border-left: 1px solid #000;
    }

    #items {
      width: 100%;
    }

    .slide-in {
       animation-name: slide;
       animation-duration: 250ms;
       animation-iteration-count: 1;
       animation-timing-function: linear;
       animation-fill-mode: forwards;
    }

    .slide-out {
       animation-name: slide-reverse;
       animation-duration: 250ms;
       animation-iteration-count: 1;
       animation-timing-function: linear;
       animation-direction: backwards;
    }

    @keyframes slide {
      from {
        right: -50%;
      }

      to {
        right: 0;
      }
    }

    @keyframes slide-reverse {
      from {
        right: 0;
      }

      to {
        right: -50%;
      }
    }

    #cart h2 { padding: 2em; display: inline-block; }

  </style>
  <button id="cart-button"><slot></slot></button>

  <div id="cart">
    <div>
      <h2>Your Cart</h2>
      <button id="close-cart-button">&times;</button>
    </div>
    <div id="items"></div>
  </div>
`;

customElements.define('shopping-cart', class ShoppingCart extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  $all(selector) {
    return this.shadowRoot && this.shadowRoot.querySelectorAll(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.items = this.items || [];

    this.addEventListener('update-cart', ({ detail: item }) => {
      this.addItem({ title: item.title, price: item.price });
    });

    this.$('#cart-button').addEventListener('click', () => {
      this.$('#cart').classList.add('slide-in');
      this.$('#cart').classList.remove('slide-out');
    });

    this.$('#close-cart-button').addEventListener('click', () => {
      this.$('#cart').classList.add('slide-out');
      this.$('#cart').classList.remove('slide-in');
    });
  }

  addItem(item) {
    this.items = [...this.items, item];
    this.updateCart();
  }

  removeItem(index) {
    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1),
    ];
    this.updateCart();
  }

  updateCart() {
    this.$('#items').innerHTML = this.items.map(
      (item, index) => `<shopping-cart-item index=${index}>
        <span slot="title">${item.title}</span>
        <span slot="price">$${item.price}</span>
      </shopping-cart-item>`,
    ).join('');

    this.$all('shopping-cart-item').forEach((elem) => {
      elem.addEventListener('remove-item', (event) => {
        this.removeItem(event.detail.index);
      });
    });
  }
});
