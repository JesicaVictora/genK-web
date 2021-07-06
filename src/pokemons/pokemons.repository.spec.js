import { PokemonsRepository } from "./pokemons.repository";
import { POKEMONS_FIRST_20 } from "../../fixtures/pokemonsFirst20";
import { POKEMON_DATA } from "../../fixtures/pokemonData";
import { POKEMON_DATA_EXTENDED } from "../../fixtures/pokemonDataExtended";
import { POKEMON_NEXT_PAGE } from "../../fixtures/PokemonsNextPage";
import axios from "axios";


jest.mock('axios');


describe("Pokemon repository", () => {

    let pokemonsRepo;

    beforeEach(() => {
        pokemonsRepo = new PokemonsRepository();
    })

    it('should get 20 pokemons', async () => {

        axios.get = jest.fn().mockResolvedValue(POKEMONS_FIRST_20);
        const result = await pokemonsRepo.getPokemons();
        //console.log(result.data.results);
        expect(result.data.results.length).toEqual(20);

    })

    it('should get 1 pokemon named bulbasaur', async () => {
        axios.get = jest.fn().mockResolvedValue(POKEMON_DATA);
        const result = await pokemonsRepo.getPokemonById(1);
        // console.log(result.data.name);
        expect(result.data.name).toEqual("bulbasaur");

    })

    it('should get 1 pokemon extended data', async () => {
        axios.get = jest.fn().mockResolvedValue(POKEMON_DATA_EXTENDED);
        const result = await pokemonsRepo.getPokemonExtendedData(1);
        // console.log(result.data.name);
        expect(result.data.name).toEqual("bulbasaur");
        expect(result.data.flavor_text_entries).toBeDefined();

    })

    it('should get the next 20 pokemons', async () => {
        axios.get = jest.fn().mockResolvedValue(POKEMON_NEXT_PAGE);
        const result = await pokemonsRepo.getPokemonsByUrl("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
        // console.log(result.data.name);
        expect(result.data.results.length).toEqual(20);


    })


})