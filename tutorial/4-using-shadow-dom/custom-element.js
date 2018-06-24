class CustomElement extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        p {
          color: blue;
        }
        #example {
          background: black;
          color: white;
        }
        .using-css-var {
          color: var(--paragraph-color);
          font-weight: var(--paragraph-weight);
        }
      </style>
      <p>I am a paragraph, inside a shadow DOM.</p>
      <p>Note that the color is defined within the shadow DOM and does not affect other paragraphs in the document</p>
      <p class="using-css-var">This paragraph is styled using variables from the host document</p>
      <button>This button's style is not affected by the external stylesheet</button>
      <button id="example">This button uses id attribute without conflicts with other exact id's</button>
    `;
  }
}

customElements.define('custom-element', CustomElement);