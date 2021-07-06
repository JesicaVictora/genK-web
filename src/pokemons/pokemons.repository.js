import axios from "axios";

export class PokemonsRepository {

    async getPokemonById(id) {
        const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
        return pokemon;
    }

    async getPokemons() {

        const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        return pokemons;

    }

    async getPokemonExtendedData(id) {

        const pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + id);
        return pokemonData;

    }
    async getPokemonsByUrl(url) {

        const pokemonData = await axios.get(url);
        return pokemonData;

    }
}