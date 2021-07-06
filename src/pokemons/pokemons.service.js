import { PokemonsRepository } from "./pokemons.repository";

export class PokemonsService {

    constructor() {
        this.repository = new PokemonsRepository();
    }


    async getFirst20Pokemons() { //Trae 20 pokemons

        return await this.repository.getPokemons();

    }
    async getPokemon(id) { //Trae la info basica de un pokemon 
        return await this.repository.getPokemonById(id);
    }

    async getPokemonExtendedData(id) { //Trae la info extendida de ese pokemon

        const pokemonDataService = await this.repository.getPokemonExtendedData(id);
        return pokemonDataService.data;
    }

    async getPokemonsByUrl(url) { //Trae los siguientes pokemons

        return await this.repository.getPokemonsByUrl(url);
    }


}