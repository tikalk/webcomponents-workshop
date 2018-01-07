// we need to implement most of this one
// we are going to get the id via attribute

class AwesomeUser extends HTMLElement {

  connectedCallback () {

  }

  disconnectedCallback () {

  }

  static get observedAttributes () {
    return ['user-id'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this.userId = newValue;
    this.goGetTheData();
  }

  // real action goes here

  render () {
    this.innerHTML = `
      <div class="user-card">
        <h2>${this.userProfile.name}</h2>
        <span class="remove-user">X</span>
        <label>Address</label>
        <span>${this.userProfile.address}</span>
        <hr/>
        <img src="${this.userProfile.picture}" />
        <hr />
        <button>Select</button>
      </div>`;
    this.querySelector('button').onclick = () => {
      this.dispatchEvent(new CustomEvent('user-selected', {detail: this.userProfile}));
    };
    this.querySelector('.remove-user').onclick = () => {
      this.remove();
    }
  }

  goGetTheData () {
    fetch(`https://randomuser.me/api/?seed=${this.userId}`)
      .then(r => r.json())
      .then(data => data.results[0])
      .then(data => {
        return {
          name: `${data.name.first} ${data.name.last}`,
          picture: data.picture.large,
          address: `${data.location.street}, ${data.location.city}, ${data.location.state}`,
          email: data.email
        }
      })
      .then(userProfile => {
        this.userProfile = userProfile;
        this.render();
      });
  }

}

customElements.define('awesome-user', AwesomeUser);