class CustomElement extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        p {
          color: blue;
        }
        ::slotted(span) {
          border: 1px solid black;
          padding: 5px;
        }
        ::slotted(span[slot="header"]) {
          border-color: red;
        }
        ::slotted(span[slot="footer"]) {
          border-color: green;
        }
      </style>
      <slot name="header"></slot>
      <hr />
      <p>I am a paragraph, inside a shadow DOM.</p>
      <p>Under this text, there is a &lt;slot&gt; element, which contains child element coming from the host application</p>
      <slot></slot>
      <p>This paragraph is from the custom element. The slot element determines where the external content will be placed</p>
      <hr/>
      <slot name="footer"></slot>
    `;
  }
}

customElements.define('custom-element', CustomElement);