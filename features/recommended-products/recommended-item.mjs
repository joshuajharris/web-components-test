const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host {
        display: inline-block;
      }

      img {
        object-fit: contain;
        width: 100%;
        display: inline-block;
      }

      h4 {
        text-transform: capitalize;
      }

      h4:hover {
        color: var(--orange-color);
        cursor: pointer;
      }
    </style>
    <img id="image" />
    <h4 id="title"></h4>
`;

export default class RecommendedItem extends HTMLElement {
  $(selector) {
    return this.shadowRoot && this.shadowRoot.querySelector(selector);
  }

  constructor(title, url) {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.$('#image').src = url;
    this.$('#title').textContent = title;
  }
}
