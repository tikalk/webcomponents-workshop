class CustomElement extends HTMLElement {

    constructor () {
        super()
        // set up default values
        this.myName = 'Custom element';
        this.myTitle = 'My Title'
    }

    renderContent () {
        // By setting innerHTML the component changes it's content
        this.innerHTML = /*html*/`
            <h2>${this.myTitle}</h2>
            <p>${this.myName}</p>
        `
    }

    connectedCallback () {
        this.renderContent();
    }

    static get observedAttributes () {
        return ['my-name', 'my-title'];
    }

    attributeChangedCallback (attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        switch (attributeName) {
            case 'my-name':
                this.myName = newValue;
                break;
            case 'my-title':
                this.myTitle = newValue;
                break;
        }
        this.renderContent();
    }

}

customElements.define('custom-element', CustomElement);