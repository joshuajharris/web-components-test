const template = document.createElement('template');
template.innerHTML = `
  <img/>
`;

export default class ProductGallery extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.updateImgSrc();

    console.log(this.filepath);
  }

  get filepath() {
    return this.getAttribute('filepath');
  }

  updateImgSrc() {
    this.$('img').src = `imgs/${this.filepath}`;
  }
}
