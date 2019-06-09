const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        color: #FF0000;
        display: inline-block;
      }
    </style>
    Act quickly, there are only <span class="count">0</span> left!
  </div>
`;

export default class ProductAvailability extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('.count').textContent = this.getAttribute('count');
  }
}
