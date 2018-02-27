const template = `

<div>Hello, slim.js</div>

`;

export default class AwesomeApplication extends Slim {
    onBeforeCreated () {

    }

    onCreated () {

    }

    onAdded () {

    }

    onRemoved () {
        
    }

    onRender () {

    }
}

Slim.tag(
    'awesome-application',
    template,
    AwesomeApplication);