import Base from './base.js';
import SUser from './s-user.js';
import SToast from './s-toast.js';

Slim.tag(
`awesome-application`,
`
<div class="container">
  <div class="jumbotron">
    <h1>Welcome to shared style + shadow DOM demo</h1>
    <h2>Let's generate some users</h2>
    <div class="form">
      <label>Users</label>
      <button s:id="btnAddUser" click="btnAddUserClick" class="btn btn-primary">Add a User</button>
      <button s:if="allowClearUsers" s:id="btnClearUsers" click="btnClearUsersClick" class="btn btn-danger">Clear List</button>
    </div>
  </div>
  <div class="container">
    <div s:id="alerts"></div>
    <div id="user-list" class="row">
      <s-user class="col-6" s:repeat="users as user" bind:user-id="user"></s-user>
    </div>
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
`,
class extends Base {
  static get sharedStyles () { return '*' };
  get useShadow () { return true; }

  onBeforeCreated () {
    this.users = [];
  }

  toast (message, warning = false) {
    const toast = document.createElement('s-toast');
    toast.warning = warning;
    toast.message = message;
    this.alerts.appendChild(toast);
  }

  btnClearUsersClick () {
    this.users = [];
    this.toast('All users cleared', true);
    this.allowClearUsers = false;
  }

  btnAddUserClick () {
    const id = Math.random().toString(16).split('.').join('');
    this.addUser(id);
    this.allowClearUsers = true;
  }

  addUser (id) {
    this.users = [...this.users, id];
    this.toast(`User ${id} added`);
  }

});