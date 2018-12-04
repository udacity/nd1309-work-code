/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import { MyBalance } from './my-balance.js';
import { MyTransaction } from './my-transaction.js'

class MyWalletInfo extends PageViewElement {

    constructor() {
        super();
    }
    
    render() {
        return html`
            ${SharedStyles}
            <section>
                <h3>Balances</h3>
                <my-balance></my-balance>
            </section>
            <section>
                <h3>Transactions</h3>
                <my-transaction></my-transaction>
            </section>
        `;
    }


}

window.customElements.define('my-walletinfo', MyWalletInfo);