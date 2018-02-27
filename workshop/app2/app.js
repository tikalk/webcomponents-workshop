export default class App extends HTMLElement {

    constructor () {
        super();
        // we can setup everything here,
        // except for adding children 💩 (spec. is Draft)
        // ...unless we are using Shadow DOM 😎
        this.innerHTML = '<div>Web Components Works 😎</div>';
    }

    connectedCallback () {
        // ComponentDidMount (react)
        // ngAfterViewInit (Angular)
        // mount (vue)
        
    }

    disconnectedCallback () {
        // ComponentDidUnMount (react)
        // ...
    }

    static get observedAttributes () {
        // attributes to watch for changes
        return [];
    }

    attributeChangedCallback (attributeName, oldValue, newValue) {
        // reaction to attribute changes
    }
}

// let's define our custom element
customElements.define('awesome-application', App);