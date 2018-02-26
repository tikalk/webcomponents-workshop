export default class BaseClass extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div role="styles"></div><div role="content"></div>`
    this.contentElement = this.shadowRoot.querySelector('div[role="content"]');
    this.styleElement = this.shadowRoot.querySelector('div[role="styles"]');
    this._embedSharedStyles();
  }

  static get sharedStyles () { return [] };

  _embedSharedStyles () {
    if (!this.shadowRoot) return;
    const styleNodes = [
      ...document.querySelectorAll('shared-style[shared-id]')];

    styleNodes.forEach(node => {
      const sharedId = node.getAttribute('shared-id');
      if (this.constructor.sharedStyles.includes(sharedId) || this.constructor.sharedStyles === '*') {
        if (!this.styleElement.querySelector(`link[shared-id=${sharedId}]`)) {
          const styleNode = document.createElement('style');
          styleNode.innerText = `@import url('${node.getAttribute('href')}')`;
          styleNode.setAttribute('shared-id', sharedId);
          this.styleElement.appendChild(styleNode)
        }
      }
    });
  }

  _render (forceTpl) {
    this.contentElement.innerHTML = forceTpl || this.template || '';
  }

  connectedCallback () {
    this._render();
  }
  
}