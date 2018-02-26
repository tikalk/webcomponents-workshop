import Base from './base.js';

export default class SToast extends Base {
  static get sharedStyles () { return ['bootstrap'] }

  onAdded () {
    setTimeout( () => {
      this.remove();
    }, 3000);
  }

  getToastClass (isWarning) {
    return `alert alert-${isWarning ? 'warning' : 'success'}`;
  }
}

Slim.tag(`s-toast`,

`
<div bind:class="getToastClass(warning)" bind>{{message}}</div>
`,

SToast);
