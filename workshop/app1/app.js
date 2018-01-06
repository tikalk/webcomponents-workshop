
class AwesomeApplication extends HTMLElement {

  constructor() {
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
      <div id="user-list">Users go here</div>
      <div id="toasts-container">Toasts goes here</div>
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
  }

  connectedCallback () {
    // let's implement this
    this.innerHTML = '<h1>Awesome App</h1>';
  }

  disconnectedCallback () {
    // let's implement this
  }

}

customElements.define('awesome-application', AwesomeApplication);