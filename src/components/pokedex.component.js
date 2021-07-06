import { css, html, LitElement, render } from 'lit';
import { PokemonsService } from '../pokemons/pokemons.service';
import '../components/modal.component';
import './pokedex.component.css';

export class PokedexComponent extends LitElement {

    constructor() {
        super();
        this.findPokemon = new PokemonsService();

    }

    static get properties() {
        return {
            pokemon: { type: String },
            buttons: { type: Array },
            showModal: { type: Boolean }

        }
    }


    static get styles() {
        return css`
        
            `
    }

    async connectedCallback() {
        super.connectedCallback();
        this.pokemon = await this.findPokemon.getPokemon(1);
        this.buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.showModal = false;

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
             
        ${this.pokemon
                ? html`
                    <div class="pokedex">
                    <div class="pokedex__hinge"></div>
                    <div class="pokedex__body-left">
                        <div class="pokedex__header">
                            <div class="pokedex__header__main-light">
                                <div class="pokedex__header__main-light-blue"></div>
                            </div>
                            <div class="pokedex__header__secondary-lights">
                                <div class="pokedex__header__red-light"></div>
                                <div class="pokedex__header__blue-light"></div>
                                <div class="pokedex__header__green-light"></div>
                            </div>
                        </div>
                        <div class="pokedex__main">
                            <div class="pokedex__main__screen">
                            <div class="pokedex__main__screen__screw-container">
                                    <div class="pokedex__main__screen__screw"></div>
                                    <div class="pokedex__main__screen__screw"></div>
                            </div> 
                            <div class="pokedex__main__screen__display">
                                    <img src="${this.pokemon.data.sprites.front_default}" alt="${this.pokemon.data.name}">
                            </div>
                            </div>
                        </div>
                        <div class="pokedex__keypad">
                            <div class = "pokedex__keypad__round-btn"></div>
                            <div class="pokedex__keypad__center">
                                <div class="pokedex__keypad__selects">
                                    <div class="pokedex__keypad__selects-start"></div>
                                    <div class="pokedex__keypad__selects-start"></div>
                                </div>
                                <div class="pokedex__keypad__info-btn" @click="${() => this.showInfo()}">+Info</div>
                            </div>
                            <div class="pokedex__keypad__dpad">
                                <div class="pokedex__dpad-up"></div>
                                <button class="pokedex__dpad-sides" id="dpad-left" @click="${() => this.getPokemon(this.pokemon.data.id - 1)}"></button>
                                <div class="pokedex__dpad-sides"></div>
                                <button class="pokedex__dpad-sides" id="dpad-right" @click="${() => this.getPokemon(this.pokemon.data.id + 1)}"></button>
                            </div>

                        </div>
                        <div class="pokedex__footer"></div>
                    </div>
                
                    <div class="pokedex__body-right">
                        <div class="pokedex__search">               
                            <input type="text" id="searchBar" class="pokedex__search__bar" readonly="readonly" >
                            <div class = "pokedex__search__btn__container">

                                ${this.buttons.map(item => html`  <button class="pokedex__search__btn" @click="${() => this.searchValue(item)}">${item}</button></li>`)}
                                
                            </div>
                        </div>
                        <div class="al-left">
                            <button class="pokedex__search__btn-send" @click="${() => this.searchPoke()}">Search</button>
                        </div>
                
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
    showInfo = () => {

        this.showModal = true;

    }

    hideInfo = () => {
        this.showModal = false;

    }

    async getPokemon(id) { //llama al pokemon service y busca un pokemon por id 

        if (id == 0 || id < 0) { //no puede ser menor a 0
            id = 1;
        }
        if (id > 898) { //no puede ser mayor de 898

            alert("The number can't be higher than 898");

            //  let searchBar = this.shadowRoot.getElementById("searchBar");
            let searchBar = document.getElementById("searchBar");
            searchBar.value = "";


        }
        if (id) {
            this.pokemon = await this.findPokemon.getPokemon(id);

        }
    }

    searchValue(num) { //agrega el numero al input para su busqueda

        // let searchBar = this.shadowRoot.getElementById("searchBar");
        let searchBar = document.getElementById("searchBar");
        if (!searchBar.value && num == 0) {
            return

        }
        searchBar.value = searchBar.value + num;
    }

    searchPoke() { //toma el valor del input y lo busca

        // let searchBar = this.shadowRoot.getElementById("searchBar");
        let searchBar = document.getElementById("searchBar");

        this.getPokemon(searchBar.value);

        searchBar.value = "";
    }



}

customElements.define('pokedex-component', PokedexComponent);