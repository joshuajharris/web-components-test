const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      overflow-wrap: break-word;
      margin: 1em 0 1em 0;
    }

    p {
      line-height: 2em;
    }
  </style>
  <p><slot></slot></p>
`;

export default class ProductDescription extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }
}
