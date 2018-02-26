import Base from './base.js';
import loadUser from './user-model.js';

export default class SUser extends Base {
  static get sharedStyles () { return '*' };
  get useShadow () { return true; }

  static get observedAttributes() { return ['user-id'] }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.userId = newValue;
      this.load();
    }
  }

  getDetailsPosition (value) {
    return value ? '0' : '100%';
  }

  toggleDetails () {
    this.detailsVisible = !this.detailsVisible;
  }

  async load () {
    this.userData = await loadUser(this.userId);
  }
}

Slim.tag(
  `s-user`,

  `
<div s:if="userData" id="details" click="toggleDetails">
  <table class="table table-dark">
    <tr>
      <td>Address</td><td bind>{{userData.location.street}}, {{userData.location.city}}, {{userData.location.state}}, {{userData.location.postcode}}</td>
    </tr>
    <tr>
      <td>User</td><td bind>{{userData.login.username}}</td>
    </tr>
    <tr>
      <td>DB Entry</td><td bind>{{userData.login.md5}}</td>
    </tr>
  </table>
</div>
<h1 s:if="userData" bind>{{userData.name.last}}, {{userData.name.first}}</h1>
<div s:if="!detailsVisible" click="toggleDetails" id="click-for-more">Show Details</div>
<style s:if="userData" bind>
  :host table td:first-child {
    font-weight: bold;
    padding-right: 1rem;
    text-align: right;
  }

  :host {
    contain: content;
    display: inline;
    padding: 0 !important;
    background: grey;
    background-image: url({{userData.picture.large}});
    border: 1px solid black;
    border-radius: 0.5rem;
    min-height: 15rem;
    position: relative;
    background-size: cover;
    height: 20rem;
    background-position: center;
    overflow: hidden;
  }

  :host #click-for-more {
    display: none;
    height: 100%;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    background: rgba(255,255,255,0.8);
  }

  :host(:hover) #click-for-more {
    display: flex;
  }

  :host #details {
    padding: 2rem;
    position: absolute;
    height: 100%;
    width: 100%;
    top: {{getDetailsPosition(detailsVisible)}};
    background: rgba(255,255,255,0.7);
    transition-property: all;
    transition-duration: 400ms;
    transition-timing-function: ease-in-out;
  }

  :host h1 {
    position: absolute;
    bottom: 0;
    margin: 0;
    width: 100%;
    background: rgba(0,0,0,0.5);
    color: white;
    text-align: center;
  }
</style>
  `,

  SUser);