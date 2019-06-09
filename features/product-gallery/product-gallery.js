import ProductImage from './product-image.mjs';
import PreviewBar from './preview-bar.mjs';

customElements.define('preview-bar', PreviewBar);
customElements.define('product-image', ProductImage);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <style>
      :host {
        color: #FF0000;
        display: inline-block;
        flex-basis: 50%;
      }

      #current {
        width: 90%;
        margin: 0 auto;
      }
    </style>
    <div id="container">
      <img id="current"/>
      <div id="previews"></div>
    </div>
  </div>
`;

customElements.define('product-gallery', class ProductGallery extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.updateCurrentImage = this.updateCurrentImage.bind(this);

    const [first] = this.filepaths;

    this.updateCurrentImage(first);

    this.$('#previews').appendChild(new PreviewBar(this.filepaths, this.updateCurrentImage));
  }

  updateCurrentImage(filepath) {
    this.$('#current').src = filepath;
  }

  get filepaths() {
    return JSON.parse(this.getAttribute('filepaths'));
  }
});
