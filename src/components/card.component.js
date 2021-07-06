import { css, html, LitElement, render } from 'lit';
import { PokemonsService } from '../pokemons/pokemons.service';
import './card.component.css';


export class CardComponent extends LitElement {

    constructor() {
        super();
        this.pokemonService = new PokemonsService();
    }


    static get properties() {
        return {

            pokemonData: { type: Object },
            pokemonService: { type: Object },
            pokemon: { type: Object },
            showInfo: { type: Function },
        }
    }

    async connectedCallback() {
        super.connectedCallback();
        this.pokemonData = await this.pokemonService.getPokemon(this.pokemon.name);

    }


    static get styles() {
        return css`
           
        `
    }

    render() {

        return html`

        ${this.pokemonData && this.pokemonData.data ?
                html` 
          <div class = "card" @click="${() => { this.showInfo(this.pokemonData) }}">
            <img src="${this.pokemonData.data.sprites.front_default}" alt="${this.pokemonData.data.name}">  
         </div>
        
        
        `
                : html``
            } 
     
       
     `;
    }
    createRenderRoot() {
        return this;
    }

}

customElements.define('card-component', CardComponent);