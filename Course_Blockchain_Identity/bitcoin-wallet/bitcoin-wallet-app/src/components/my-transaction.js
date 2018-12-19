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
import { transaction } from './my-icons.js';

export class MyTransaction extends LitElement {

    constructor() {
        super();
        this.transactions = [];
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
                .card{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    cursor: pointer;
                    background: #FFF;
                    border-radius: 3px;
                    box-shadow: 0 3px 4px rgba(0,0,0,0.3);
                    margin: 20px 0;
                    height: 120px;
                }
                .card_item {
                    display: flex;
                    flex-direction: column;
                }
            </style>
            <div class="container">
                ${this.transactions.map(info => html`
                    <div class="card">
                        ${transaction}
                        <div class="card_item">
                            ${new Date(info.time).toLocaleString()}
                            <span>${info.label}</span>
                            <span>${info.amount}</span>
                        </div>
                        <span>${
                            (info.category).toUpperCase()
                        }</span>
                    </div>
                `)}
            </div>
        `;
    }

    static get properties() { return {
        transactions: { type: Array }
    }}

    firstUpdated() {
        fetch("http://localhost:8000/api/listtransactions").then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log("Something went wrong.");
            }
        }).then((transactions) => {
            this.transactions = transactions;
        }).catch((error) => { console.log(error); })
    }
}

window.customElements.define('my-transaction', MyTransaction);