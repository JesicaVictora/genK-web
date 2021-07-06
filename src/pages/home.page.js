import { css, html, LitElement, render } from 'lit';



export class HomePage extends LitElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const twitterContainer = document.getElementById("twitter");
        twitterContainer.style.display = "flex";

    }
    static get styles() {
        return css`
       
           
            `
    }

}

customElements.define('home-page', HomePage);