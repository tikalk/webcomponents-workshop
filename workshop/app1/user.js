// we need to implement most of this one
// we are going to get the id via attribute

class AwesomeUser extends HTMLElement {

  connectedCallback () {

  }

  disconnectedCallback () {

  }

  static get observedAttributes () {
    return []; // ??
  }

  attributeChangedCallback () {
    
  }

  // real action goes here

  render () {

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