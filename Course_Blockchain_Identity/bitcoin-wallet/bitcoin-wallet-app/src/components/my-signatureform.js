/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { MDCTextField } from '@material/textfield/index'
import { SharedStyles, TextfieldStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

export class MySignatureForm extends LitElement {

    constructor() {
        super();
    }
    
    render() {
        return html`
            ${SharedStyles}
            ${TextfieldStyles}
            ${ButtonSharedStyles}
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin-right: auto;
                    margin-left: auto;
                }
                .mdc-text-field {
                    margin-top: 8px;
                    margin-bottom: 8px;
                }
            </style>
            <div class="container">
                <p>
                    You can sign message/agreements with your addresses (for Bitcoin Core v17 you need to use legacy address)
                    to prove you can receive Bitcoins sent to them. Be careful not sign anything vague or random, as pishing
                    attacks may try to trick you into signing your identity over to them. Only sign fully-detailed statements
                    you agree to.
                </p>
                <div class="mdc-text-field" id="tbAddress">
                    <input type="text" id="tbAddressInput" class="mdc-text-field__input" required>
                    <label class="mdc-floating-label" for="tbAddressInput">Receiving Address</label>
                    <div class="mdc-line-ripple"></div>
                </div>
                <div class="mdc-text-field" id="tbMessage">
                    <input type="text" id="tbMessageInput" class="mdc-text-field__input" required>
                    <label class="mdc-floating-label" for="tbMessageInput">Message</label>
                    <div class="mdc-line-ripple"></div>
                </div>
                <button @click="${(event) => this.signMessage(event)}">Sign</button>
                <div class="mdc-text-field" id="tbSignature">
                    <input type="text" id="tbSignatureInput" class="mdc-text-field__input" disabled="${this.disable}">
                    <label class="mdc-floating-label" for="tbSignatureInput">Copy Signature</label>
                    <div class="mdc-line-ripple"></div>
                </div>
            </div>
        `;
    }

    static get properties() { 
        return {

        }
    }

    firstUpdated() {
        this.tbAddress = new MDCTextField(this.shadowRoot.querySelector("#tbAddress"));
        this.tbMessage = new MDCTextField(this.shadowRoot.querySelector("#tbMessage"));
        this.tbSignature = new MDCTextField(this.shadowRoot.querySelector("#tbSignature"));
        this.tbSignature.disabled = true;
    }

    signMessage(evt) {
        let address = this.tbAddress.value;
        let message = this.tbMessage.value;
        fetch("http://localhost:8000/api/signmessage", {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({address: address, message: message}), // body data type must match "Content-Type" header
        }).then(response => response.json()).then((signature) => {
            this.tbSignature.value = signature;
            this.tbSignature.disabled = false;
        })
    }
}

window.customElements.define('my-signatureform', MySignatureForm);