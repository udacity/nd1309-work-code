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

export class MyBlockHashUtilityForm extends LitElement {

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
                    padding: 20px;
                }
                .container_color_red {
                    background: #F5B6DA;
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin-right: auto;
                    margin-left: auto;
                    padding: 20px;
                }
                .container_color_green {
                    background: #DEFABB;
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin-right: auto;
                    margin-left: auto;
                    padding: 20px;
                }
                .mdc-text-field {
                    margin-top: 8px;
                    margin-bottom: 8px;
                }
            </style>
            <div class="${this.isCorrect?'container_color_green':'container_color_red'}">
                <div class="mdc-text-field" id="tbHeight">
                    <input type="number" id="tbHeightInput" class="mdc-text-field__input" required value="${this.height}" @change="${this.onHeightChange}">
                    <label class="mdc-floating-label" for="tbHeightInput">Height</label>
                    <div class="mdc-line-ripple"></div>
                </div>
                <div class="mdc-text-field" id="tbBody">
                    <input type="text" id="tbBodyInput" class="mdc-text-field__input" required value="${this.body}" @change="${this.onBodyChange}">
                    <label class="mdc-floating-label" for="tbBodyInput">Body</label>
                    <div class="mdc-line-ripple"></div>
                </div>
                <div class="mdc-text-field" id="tbHash">
                    <input type="text" id="tbHashInput" class="mdc-text-field__input" value="${this.hash}">
                    <label class="mdc-floating-label" for="tbHashInput">Hash</label>
                    <div class="mdc-line-ripple"></div>
                </div>
                <button @click="${(event) => this.mining(event)}">Mine</button>
            </div>
        `;
    }

    constructor() {
        super();
        this.height = 0;
        this.hash = null;
        this.body = "";
    }

    static get properties() { 
        return {
            height: { type: Number},
            body: { type: String},
            hash: {type: String},
            isCorrect: {type: Boolean}
        }
    }

    firstUpdated() {
        this.tbHeight = new MDCTextField(this.shadowRoot.querySelector("#tbHeight"));
        this.tbBody = new MDCTextField(this.shadowRoot.querySelector("#tbBody"));
        this.tbHash = new MDCTextField(this.shadowRoot.querySelector("#tbHash"));
        let height = this.tbHeight.value;
        let body = this.tbBody.value;
        fetch("http://localhost:8000/api/utilityblockhash", {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({height: height, body: body}), // body data type must match "Content-Type" header
        }).then(response => response.json()).then((hash) => {
            this.hash = hash;
            this.isCorrect = true;
        })
    }

    mining(evt) {
        let height = this.tbHeight.value;
        let body = this.tbBody.value;
        fetch("http://localhost:8000/api/utilityblockhash", {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({height: height, body: body}), // body data type must match "Content-Type" header
        }).then(response => response.json()).then((hash) => {
            this.hash = hash;
            this.isCorrect = true;
        })
    }

    onBodyChange(evt) {
        let height = this.tbHeight.value;
        let body = this.tbBody.value;
        fetch("http://localhost:8000/api/utilityblockhash", {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({height: height, body: body}), // body data type must match "Content-Type" header
        }).then(response => response.json()).then((hash) => {
            if(this.hash !== hash){
                this.isCorrect = false;
            }
        })
    }

    onHeightChange(evt) {
        let height = this.tbHeight.value;
        let body = this.tbBody.value;
        fetch("http://localhost:8000/api/utilityblockhash", {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({height: height, body: body}), // body data type must match "Content-Type" header
        }).then(response => response.json()).then((hash) => {
            if(this.hash !== hash){
                this.isCorrect = false;
            }
        })
    }
}

window.customElements.define('my-blockhashutilityform', MyBlockHashUtilityForm);