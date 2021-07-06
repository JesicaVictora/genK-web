
import { css, html, LitElement, render } from 'lit';
import '../components/pokedex.component';


export class PokedexPage extends LitElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const twitterContainer = document.getElementById("twitter");
        twitterContainer.style.display = "none";

        this.innerHTML = `<pokedex-component></pokedex-component>`;
    }
    static get styles() {
        return css`
       
           
            `
    }

}

customElements.define('pokedex-page', PokedexPage);