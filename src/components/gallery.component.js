import { css, html, LitElement, render } from 'lit';
import { PokemonsService } from '../pokemons/pokemons.service';
import './card.component';
import './modal.component'
import './gallery.component.css'


export class GalleryComponent extends LitElement {

    constructor() {
        super();
        this.pokemonService = new PokemonsService();
    }


    static get properties() {
        return {

            pokemonData: { type: Object },
            pokemonService: { type: Object },
            pokemonNewData: { type: Object },
            showModal: { type: Boolean },
            pokemon: { type: Object }
        }
    }

    async connectedCallback() {
        super.connectedCallback();
        this.pokemonData = await this.pokemonService.getFirst20Pokemons();
        this.showModal = false;
    }


    static get styles() {
        return css`

        `
    }

    render() {

        return html`

        ${this.showModal
                ? html`
        <div>
            <modal-component .info = "${this.pokemon.data}" .close= "${this.hideInfo}"></modal-component>
        </div>
        `
                : html``
            }

        
        <div class="gallery" id="gallery">
        ${this.pokemonData
                ? html`
             
                 ${this.pokemonData.data.results.map(pokemon => html` 
                    
                    <card-component .pokemon = ${pokemon} .showInfo="${this.showInfo}"></card-component>    
                 
                 `)}
                  
                 `
                : html``
            }
          
        </div>
        <div class="gallery__btn">
                <button @click="${() => this.showMore(this.pokemonData.data.next)}" id="gallery-showmore-btn"> Show more </button>
         </div>
     `;
    }
    createRenderRoot() {
        return this;
    }

    async showMore(url) {

        this.pokemonNewData = await this.pokemonService.getPokemonsByUrl(url);

        const { next, results } = this.pokemonNewData.data;
        this.pokemonData.data.next = next;

        for (const pokemon of results) {

            this.pokemonData.data.results.push(pokemon);

        }
        this.requestUpdate();

    }

    showInfo = (data) => {

        this.pokemon = data;
        this.showModal = true;

    }

    hideInfo = () => {
        this.showModal = false;

    }

}

customElements.define('gallery-component', GalleryComponent);