import { css, html, LitElement, render } from 'lit';
import '../components/gallery.component';


export class PokemonPage extends LitElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const twitterContainer = document.getElementById("twitter");
        twitterContainer.style.display = "none";

        this.innerHTML = `<gallery-component></gallery-component>`;
    }
    static get styles() {
        return css`
       
           
            `
    }

}

customElements.define('pokemon-page', PokemonPage);