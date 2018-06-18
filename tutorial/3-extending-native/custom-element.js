const uid = 0;

class WordCountElement extends HTMLSpanElement {

    constructor () {
        super()
        this.checkWordCount = this.checkWordCount.bind(this);
    }

    connectedCallback () {
        this.contentEditable = "true";
        this.addEventListener('keyup', this.checkWordCount);
    }

    createCountNode () {
        if (!this.countNode || !this.countNode.parentElement) {
            this.countNode = document.createElement('span');
            this.countNode.style.fontSize = '0.9rem';
            this.countNode.style.paddingLeft = '0.5rem';
            this.countNode.style.color = 'blue';
            this.countNode.style.fontWeight = 'bold';
            this.appendChild(this.countNode);
            this.countNode.contentEditable = "false";
        }
    }

    disconnectedCallback () {
        this.removeEventListener('keyup', this.checkWordCount);
    }

    checkWordCount () {
        this.createCountNode();
        const count = this.innerText.length - this.countNode.innerText.length;
        this.countNode.innerText = `Total ${count} characters`
    }

}

customElements.define('word-count', WordCountElement, { extends: 'span' });



class DollarInput extends HTMLInputElement {
    constructor() {
        super();
        this.changeObserver = this.changeObserver.bind(this);
    }

    changeObserver (e) {
        this.value = `$${this.value.replace(/\D/g,'')}`;
    }

    connectedCallback () {
        this.setAttribute('type', 'text');
        this.addEventListener('input', this.changeObserver);
        this.changeObserver();
    }

    disconnectedCallback () {
        this.removeEventListener('input', this.changeObserver);
    }
}

customElements.define('dollar-input', DollarInput, { extends: 'input' });