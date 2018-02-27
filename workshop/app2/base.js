// This is going to be our base class with superpowers
// which we are going to extend with other classes

export default class BaseClass extends HTMLElement {

    constructor () {
      super();
    }

    /**
     * @protected
     */
    get template () {
      return undefined;
    }
  
    /**
     * @private
     * @param {string} content 
     */
    _render (content) {
      this.contentElement.innerHTML = content || this.template || '';
    }
    
    connectedCallback () {
      this._render();
    }
    
  }
  