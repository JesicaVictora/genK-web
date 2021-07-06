import { css, html, LitElement, render } from 'lit';
import { PokemonsService } from '../pokemons/pokemons.service';
import 'pokemon-chart/pokemon-chart';
import './modal.component.css'




export class ModalComponent extends LitElement {

    constructor() {
        super();
        this.findPokemon = new PokemonsService();
    }


    static get properties() {
        return {
            info: { type: Object },
            close: { type: Function },
            pokemonData: { type: Object }
        }
    }

    async connectedCallback() {
        super.connectedCallback();
        this.pokemonData = await this.findPokemon.getPokemonExtendedData(this.info.id);
    }


    static get styles() {
        return css`
           
   
        `
    }

    render() {

        return html`

        ${this.pokemonData ?
                html`
            <div class="modal__container"  @click="${() => { this.close() }}">

            <div class="modal__body">
                <h1>${this.info.name}</h1>
                <div> 
                    <img src="${this.info.sprites.front_default}" alt="${this.info.name}-front">
                    <img src="${this.info.sprites.back_default}" alt="${this.info.name}-back">
                </div>   
                ${this.pokemonData.evolves_from_species
                        ? html`
                        <p>Evolves from: ${this.pokemonData.evolves_from_species.name}</p>
                        `
                        : html``
                    }
                ${this.pokemonData
                        ? html`
                    <p>${this.pokemonData.flavor_text_entries[1].flavor_text}</p>
                    `
                        : html``
                    }
                        
                    <pokemon-chart .stats=${this.info.stats} ></pokemon-chart>  
            </div>
           
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

customElements.define('modal-component', ModalComponent);