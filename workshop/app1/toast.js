// we need to implement everything here
// we are going to receive the message via property ("accessor")

class AwesomeToast extends HTMLElement {

  connectedCallback () {
    this.style.display = 'block';
    setTimeout(() => {
      this.remove();
    }, 3000);
  }

  disconnectedCallback () {

  }

  set message (value) {
    this.innerText = value;
  }

  get message () {
    return this.innerText;
  }

  static get observedAttributes () {
    return []; // ??
  }

  attributeChangedCallback () {

  }

}

customElements.define('awesome-toast', AwesomeToast);