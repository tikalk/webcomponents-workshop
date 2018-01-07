function _random(x) {
  return Math.floor(Math.random() * x);
}


class AwesomeApplication extends HTMLElement {

  constructor () {
    super();
    console.log('I am an awesome application');
  }

  get template () {
    return `
      <div id="header">
        <h1>Awesome App</h1>
        <button id="add-user">Add User</button>
        <button id="add-toast">Pop important message</button>
      </div>
      <div id="user-list"></div>
      <div id="toasts-container"></div>
    `;
  }

  createAwesomeMessage () {
    const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    const message = adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)];
    return message;
  }

  createToast () {
    // let's implements this
      const message = this.createAwesomeMessage();
      const toast = document.createElement('awesome-toast');
      toast.message = message;
      return toast;
  }

  connectedCallback () {
    // let's implement this
    this.innerHTML = this.template;
    this.querySelector('#add-user').onclick = this.addUser.bind(this);
    this.querySelector('#add-toast').onclick = this.addToast.bind(this);
  }

  addUser () {
    const e = this.querySelector('#user-list');
    const id = Math.random().toString(16);
    const userElement = document.createElement('awesome-user');
    userElement.setAttribute('user-id', id);
    e.appendChild(userElement);
    userElement.addEventListener('user-selected', (e) => {
      alert(e.detail.name + ' Selected');
    })
  }

  addToast () {
    const toast = this.createToast();
    this.querySelector('#toasts-container').appendChild(toast);
  }

  disconnectedCallback () {
    // let's implement this
  }
}

customElements.define('awesome-application', AwesomeApplication);
