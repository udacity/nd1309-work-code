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
import { bitcoin } from './my-icons.js';

export class MyBalance extends LitElement {

    constructor() {
        super();
        this.available = 0.0;
        this.pending = 0.0;
    }
    
    render() {
        return html`
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin-right: auto;
                    margin-left: auto;
                }
                .container_item {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                }
                label {
                    font-weight: 550;
                }
            </style>
            <div class="container">
                <div class="container_item">
                    <label>Available: &nbsp</label>
                    <span>${this.available}</span>
                    &nbsp
                    ${bitcoin}
                </div>
                <div class="container_item">
                    <label>Pending: &nbsp</label>
                    <span>${this.pending}</span>
                    &nbsp
                    ${bitcoin}
                </div>
            </div>
        `;
    }

    static get properties() { return {
        available: { type: Number },
        pending: { type: Number }
    }}

    firstUpdated() {
        fetch("http://localhost:8000/api/getWalletInfo").then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log("Something went wrong.");
            }
        }).then((info) => {
            this.available = info.balance;
            this.pending = info.unconfirmed_balance;
        }).catch((error) => { console.log(error); })
    }
}

window.customElements.define('my-balance', MyBalance);