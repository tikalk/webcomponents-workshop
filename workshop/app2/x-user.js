import Base from './base.js';

export default class XUser extends Base {
  get template() {
    const { login, name, picture, location } = this.data || {};
    return `
      ${this.data ? `
        
        ` : '<div>Loading...</div>'}
    `;
  }

  static get sharedStyles () { return '*' };

  static get useShadow () { return true }

  static createElement(id) {
    const result = document.createElement('x-user');
    result.setAttribute('user-id', id);
    result.classList.add('col-6');
    return result;
  }

  constructor () {
    super();
    this.expanded = false;
    this.addEventListener('click', () => {
      if (!this.data) {
        this.innerHTML = '';
        this.loadData();
        return;
      }
      this.expanded = !this.expanded;
      this.expanded ? this.shadowRoot.querySelector('#details').setAttribute('expanded', '') : this.shadowRoot.querySelector('#details').removeAttribute('expanded');
    })
  }

  loadData () {
    fetch(`https://randomuser.me/api/?seed=${this.getAttribute('user-id')}`)
      .then(r => r.json())
      .then(data => {
        this.data = data.results[0];
        this._render();
      })
      .catch(() => {
        this._render('<div>Could not load</div>')
      })
  }

  connectedCallback () {
    super.connectedCallback();
    this.loadData();
  }
}

customElements.define('x-user', XUser);