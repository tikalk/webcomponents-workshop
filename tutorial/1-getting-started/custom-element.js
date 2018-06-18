class CustomElement extends HTMLElement {

    constructor () {
        super()
        this.myName = 'I am a custom element';
        console.log(`${this.myName} and the constructor is the first function to run`);
    }

    connectedCallback () {
        console.log(`${this.myName} and I have been attached to the DOM`)
    }

    disconnectedCallback () {
        console.log(`${this.myName} and I have been removed from the DOM`)
    }

    static get observedAttributes () {
        return ['my-name', 'my-title'];
    }

    attributeChangedCallback (attributeName, oldValue, newValue) {
        // oldValue and newValue are always strings
        console.log(`${this.myName} and I detected that attribute ${attributeName} was changed from ${oldValue} to ${newValue}`);
    }

}

customElements.define('custom-element', CustomElement);