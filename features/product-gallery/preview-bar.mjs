import ProductImage from './product-image.mjs';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    product-image {
      min-height: 64px;
      width: 64px;
      display: inline-block;
      cursor: pointer;
    }

    product-image:hover {
      border: 1px solid orange;
    }
  </style>
  <div id="container"></div>
`;

export default class PreviewBar extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor(filepaths, onClick) {
    super(filepaths, onClick);

    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    filepaths.forEach(
      filepath => this.$('#container').append(new ProductImage(filepath, onClick)),
    );
  }
}
