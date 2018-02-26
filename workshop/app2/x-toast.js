import Base from './base.js';

export default class XToast extends Base {
  get template () {
    return `<div class="alert alert-${this.hasAttribute('warning') ? 'warning' : 'success'}">${this.getAttribute('message')}</div>`
  }

  static get sharedStyles () { return ['bootstrap'] }

  connectedCallback () {
    this._render();
    setTimeout( () => {
      this.remove();
    }, 3000);
  }

  static createElement (message = 'default message', isWarning = true ) {
    const e = document.createElement('x-toast');
    if (isWarning) {
      e.setAttribute('warning', '');
    }
    e.setAttribute('message', message);
    return e;
  }

}

customElements.define('x-toast', XToast);