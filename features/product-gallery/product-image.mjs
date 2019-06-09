const template = document.createElement('template');
template.innerHTML = `
  <style>
    img {
      object-fit: contain;
      display: inline-block;
      width: 100%;
    }
  </style>
  <img/>
`;

export default class ProductGallery extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor(filepath, onClick) {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('img').src = filepath;

    this.addEventListener('click', () => onClick(filepath));
  }
}
