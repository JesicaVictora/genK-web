import { POKEMONS_FIRST_20 } from "../../fixtures/pokemonsFirst20";
import { POKEMON_DATA } from "../../fixtures/pokemonData";
import { POKEMON_DATA_EXTENDED } from "../../fixtures/pokemonDataExtended";
import { POKEMON_NEXT_PAGE } from "../../fixtures/PokemonsNextPage";
import { PokemonsRepository } from "./pokemons.repository";
import { PokemonsService } from "./pokemons.service";
jest.mock('./pokemons.repository');

describe('Pokemons service', () => {

    beforeEach(() => {
        PokemonsRepository.mockClear();
    })

    it('should get 20 pokemons', async () => {

        PokemonsRepository.mockImplementation(() => {
            return {
                getPokemons: () => {
                    return POKEMONS_FIRST_20
                }
            }
        });

        const service = new PokemonsService();
        const pokemons = await service.getFirst20Pokemons();
        expect(pokemons.data.results.length).toEqual(20);
        expect(pokemons.data.results[0].name).toEqual("bulbasaur");
        expect(pokemons.data.results[0].url).toBeDefined();
        expect(PokemonsRepository).toHaveBeenCalledTimes(1);
    })

    it('should get 1 pokemon data', async () => {

        PokemonsRepository.mockImplementation(() => {
            return {
                getPokemonById: (id) => {
                    return POKEMON_DATA
                }
            }
        });

        const service = new PokemonsService();
        const pokemon = await service.getPokemon(1);


        expect(pokemon.data).toBeDefined();
        expect(pokemon.data.sprites).toBeDefined();
        expect(PokemonsRepository).toHaveBeenCalledTimes(1);
    })



    it('should get 1 pokemon extended data', async () => {

        PokemonsRepository.mockImplementation(() => {
            return {
                getPokemonExtendedData: (id) => {
                    return POKEMON_DATA_EXTENDED
                }
            }
        });

        const service = new PokemonsService();
        const pokemon = await service.getPokemonExtendedData(1);
        expect(pokemon).toBeDefined();
        expect(pokemon.flavor_text_entries).toBeDefined();
        expect(PokemonsRepository).toHaveBeenCalledTimes(1);
    })


    it('should get the next 20 pokemons', async () => {

        PokemonsRepository.mockImplementation(() => {
            return {
                getPokemonsByUrl: (id) => {
                    return POKEMON_NEXT_PAGE
                }
            }
        });

        const service = new PokemonsService();
        const pokemons = await service.getPokemonsByUrl("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
        expect(pokemons.data.results.length).toEqual(20);
        expect(pokemons.data.results[0].name).toBeDefined();
        expect(pokemons.data.results[0].url).toBeDefined();

        expect(PokemonsRepository).toHaveBeenCalledTimes(1);
    })
})