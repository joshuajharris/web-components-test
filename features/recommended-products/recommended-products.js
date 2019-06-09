import fetchRecommended from './fetch-recommended.mjs';
import RecommendedItem from './recommended-item.mjs';

customElements.define('recommended-item', RecommendedItem);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        display: inline-block;
      }

      #items {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
      }

      recommended-item {
        flex-basis: 18%;
      }

      .mobile {
        flex-basis: 100%;
      }
    </style>
    <h2>Recommended Products</h2>
    <div id="items"></div>
  </div>
`;

customElements.define('recommended-products', class RecommendedProducts extends HTMLElement {
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

    fetchRecommended().then((items) => {
      items.forEach(({ title, url }) => {
        this.$('#items').append(new RecommendedItem(title, url));
      });
    });
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ('size') {
      this.$all('recommended-item').forEach((elem) => {
        if (newValue === 'mobile') {
          elem.classList.add('mobile');
        } else {
          elem.classList.remove('mobile');
        }
      });
    }
  }
});
