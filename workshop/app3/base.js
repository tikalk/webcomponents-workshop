export default class Base extends Slim {

  static get sharedStyles () { return [] };

  get useShadow() { return true; }

  _embedSharedStyles () {
    if (!this.constructor.sharedStyles || !this.shadowRoot) return;
    const styleNodes = [
      ...document.querySelectorAll('shared-style[shared-id]')];

    styleNodes.forEach(node => {
      const sharedId = node.getAttribute('shared-id');
      if (this.constructor.sharedStyles.includes(sharedId) || this.constructor.sharedStyles === '*') {
        if (!this.shadowRoot.querySelector(`link[shared-id=${sharedId}]`)) {
          const styleNode = document.createElement('style');
          styleNode.innerText = `@import url('${node.getAttribute('href')}')`;
          styleNode.setAttribute('shared-id', sharedId);
          const root = Slim.root(this);
          if (root.firstChild) {
            root.insertBefore(styleNode, root.firstChild);
          } else {
            root.appendChild(styleNode);
          }
        }
      }
    });
  }

  onRender () {
    this._embedSharedStyles();
  }
}