//=============================================================================
// All API calls are gathered here -- By Pokemon and Type
//=============================================================================

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


