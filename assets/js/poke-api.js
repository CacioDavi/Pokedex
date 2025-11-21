const pokeApi = {};

function applyApiOnModel (pokeDetail) {

    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlots) => typeSlots.type.name);
    const [type] = types;

    pokemon.type = type;
    pokemon.types = types;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(((details) => details.json()))
        .then(applyApiOnModel)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails) 
} 