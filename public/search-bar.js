const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <slot></slot>
  </div>
`;

customElements.define('search-bar', class SearchBar extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }
});
