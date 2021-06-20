//=============================================================================
// All API calls are gathered here -- By Pokemon and Type
//=============================================================================

const URL_POKEMON = "https://pokeapi.co/api/v2/";

//Call an individual pokemon
export async function fetchPokemon(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
    // setFilter([data]);
  } catch (err) {
    console.error(err);
  }
}

//Call pokemon by type - get
export async function fetchPokemonByType(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const pokeTypes = await getAllPokemonByType(data.pokemon);
    console.log(pokeTypes);
    return pokeTypes;
  } catch (err) {
    console.error(err);
  }
}
//Get each pokemon fetched by type
async function getAllPokemonByType(data) {
  const _pokemonData = await Promise.all(
    data.map(async (pokemon) => {
      let pokemonRecord = await fetch(pokemon.pokemon.url);
      let pokemonRecordData = await pokemonRecord.json();
      return pokemonRecordData;
    })
  );
  return _pokemonData;
}

export async function getAllTypes(data) {
  const _pokemonData = await Promise.all(
    data.map(async (pokemon) => {
      let pokemonRecord = await fetch(pokemon.url);
      let pokemonRecordData = await pokemonRecord.json();
      return pokemonRecordData;
    })
  );
  return _pokemonData;
}

export async function getAllPokemon(data) {
  const _pokemonData = await Promise.all(
    data.map(async (pokemon) => {
      let pokemonRecord = await fetch(pokemon.url);
      let pokemonRecordData = await pokemonRecord.json();
      return pokemonRecordData;
    })
  );
  return _pokemonData;
}

export async function fetchData(typeurl) {
  try {
    const resp = await fetch(`${URL_POKEMON}${typeurl}`);
    const data = await resp.json();
    if (typeurl == "pokemon") {
      const allPoke = await getAllPokemon(data.results);
      return allPoke;
    } else if (typeurl == "type") {
      const allType = await getAllTypes(data.results);
      return allType;
    }
  } catch (err) {
    console.error(err);
  }
}
