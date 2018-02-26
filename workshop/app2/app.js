import Base from './base.js';
import XUser from './x-user.js';
import XToast from './x-toast.js';

class AwesomeApplication extends Base {

  static get sharedStyles () { return '*' };

  get template () {
    return `
      <div class="container">
        <div class="jumbotron">
          <h1>Welcome to shared style + shadow DOM demo</h1>
          <h2>Let's generate some users</h2>
          <div class="form">
            <label>Users</label>
            <button id="add-user" class="btn btn-primary">Add a User</button>
            <button id="clear-users" class="btn btn-danger">Clear List</button>
          </div>
        </div>
        <div class="container">
          <div id="alerts"></div>
          <div id="user-list" class="row">${this.renderUsers()}</div>
        </div>
      </div>
      
      <style>
        :host {
          position: relative;
          display: block;
          height: 100%;
          overflow-y: auto;
        }

        :host #alerts {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      </style>
    `;
  }

  constructor () {
    super();
    this.users = [];
    this._render();
    this.shadowRoot.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick (e) {
    switch (e.target.id) {
      case 'add-user':
        this.addUser(Math.random().toString(16).split('.').join(''));
        this.showAlert('User Added');
        break;
      case 'clear-users':
        this.clearUsers();
        this.showAlert('List cleared', true);
        break;
    }
  }

  showAlert (message, warning = false) {
    this.shadowRoot
      .querySelector('#alerts')
      .appendChild(XToast.createElement(message, warning));
  }

  clearUsers () {
    this.users = [];
    this.shadowRoot.querySelector('#user-list').innerHTML = '';
  }

  addUser (id) {
    this.users = [...this.users, id];
    this.shadowRoot.querySelector('#user-list').appendChild(XUser.createElement(id));
  }

  _render () {
    super._render();
    this._embedSharedStyles();
  }

  renderUsers () {
    return this.users.map(user => `<div class="col-6"><x-user user-id="${user}"></x-user></div>`).join('');
  }

  connectedCallback () {
    super.connectedCallback();
    this.addUser(123);
  }

};

AwesomeApplication.useShadow = true;

customElements.define('awesome-application', AwesomeApplication);