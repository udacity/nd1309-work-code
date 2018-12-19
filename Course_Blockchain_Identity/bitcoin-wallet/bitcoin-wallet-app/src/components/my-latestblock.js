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
import { blockIcon } from './my-icons.js';
import { SharedStyles } from './shared-styles.js';

export class MyLatestBlock extends LitElement {

    constructor() {
        super();
        this.blocks = [];
    }
    
    render() {
        return html`
            ${SharedStyles}
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    max-width: 900px;
                    margin-right: auto;
                    margin-left: auto;
                    height: auto;
                }
                .card{
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    background: #FFF;
                    border-radius: 3px;
                    box-shadow: 0 3px 4px rgba(0,0,0,0.3);
                    margin: 20px 0;
                    height: auto;
                    min-height: 120px;
                }
                .row {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    margin: 8px;
                }
                label {
                    font-weight: 550;
                    font-size: 14px;
                }
                span {
                    word-wrap: break-word;
                    font-size: 12px;
                    max-width: 350px;
                }
                pre {
                    font-size: 8px;
                    width: 300px;
                    white-space: pre-wrap;       /* Since CSS 2.1 */
                    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
                    white-space: -pre-wrap;      /* Opera 4-6 */
                    white-space: -o-pre-wrap;    /* Opera 7 */
                    word-wrap: break-word;       /* Internet Explorer 5.5+ */
                }
                @media (min-width: 200px) {
                    span {
                        max-width: 190px;
                    }
                    pre {
                        width: 190px;
                    }
                }
                @media (min-width: 350px) {
                    span {
                        max-width: 300px;
                    }
                    pre {
                        width: 300px;
                    }
                }
                @media (min-width: 460px) {
                    span {
                        max-width: 490px;
                    }
                    pre {
                        width: 490px;
                    }
                }
                .hidden {
                    display: none;
                }
            </style>
            <div class="container">
                ${this.blocks.sort((a, b) => { return b.height - a.height; }).map(block => html`
                    <div class="card">
                        <div class="row">${blockIcon}</div>
                        <div class="row">
                            <label>Hash:</label>
                            <span>${block.hash}</span>
                        </div>
                        <div class="row">
                            <label>Height:</label>
                            <span>${block.height}</span>
                        </div>
                        <div class="row">
                            <label>Time:</label>
                            <span>${new Date(block.time).toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <label>Merkleroot:</label>
                            <span>${block.merkleroot}</span>
                        </div>
                        <div class="row">
                            <label>Body:</label>
                            ${block.tx.slice(0, 5).map(tx => html`
                                <div class="row"><span>${tx} <button @click="${(event) => this.openDialog(tx)}">View</button> </span></div>
                                <section id="id${tx}" class="hidden">
                                    <pre>${JSON.stringify(this.transaction, undefined, 2)}</pre>
                                </section>
                            `)}
                        </div>
                        <div class="row">
                            <label>Previous Hash:</label>
                            <span>${block.previousblockhash}</span>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    static get properties() { return {
        blocks: { type: Array },
        lastSection: { type: String},
        transaction: {type: Object}
    }}

    firstUpdated() {
        fetch("http://localhost:8000/api/blocks").then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log("Something went wrong.");
            }
        }).then((response) => {
            this.blocks = response;
        }).catch((error) => { console.log(error); })
    }

    openDialog(tx){
        console.log(tx);
        let idAux = `#id${tx}`;
        let section = this.shadowRoot.querySelector(idAux);
        section.classList.remove("hidden");
        if(this.lastSection){
            let lastSectionDom = this.shadowRoot.querySelector(`#id${this.lastSection}`);
            lastSectionDom.classList.add("hidden");
        }
        this.lastSection = tx;
        this.loadTransactionData(tx);
    }

    loadTransactionData(tx) {
        fetch(`http://localhost:8000/api/transactioninfo?tx=${tx}`).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log("Something went wrong.");
            }
        }).then((response) => {
            this.transaction = response;
        }).catch((error) => { console.log(error); })
    }

}

window.customElements.define('my-latestblock', MyLatestBlock);