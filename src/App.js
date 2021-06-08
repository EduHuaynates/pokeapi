import react, { useEffect, useState } from "react";
import Select from "react-select";
import ReactLoading from "react-loading";
import DataTable from "react-data-table-component";
import {
  fetchPokemon,
  fetchPokemonByType,
  getAllTypes,
  getAllPokemon,
} from "./api";

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [filter, setFilter] = useState([]);
  const [pokemon, setPokemon] = useState({ value: "", label: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("pokemon");
    fetchData("type");
  }, []);

  const URL_POKEMON = "https://pokeapi.co/api/v2/";

  async function fetchData(typeurl) {
    try {
      setLoading(true);
      const resp = await fetch(`${URL_POKEMON}${typeurl}`);
      const data = await resp.json();
      if (typeurl == "pokemon") {
        const allPoke = await getAllPokemon(data.results);
        setLoading(false);
        setData(allPoke);
      } else if (typeurl == "type") {
        const allType = await getAllTypes(data.results);
        setLoading(false);
        setType(allType);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleInputChange = async (value) => {
    setPokemon(value);
    setLoading(true);
    const poke = await fetchPokemon(`${URL_POKEMON}pokemon/${value.label}`);
    setLoading(false);
    setLoading(false);
    setFilter([poke]);
  };

  const handleInputChangeType = async (value) => {
    setPokemon(value);
    setLoading(true);
    const pokemonByType = await fetchPokemonByType(
      `${URL_POKEMON}type/${value.label}`
    );
    setLoading(false);
    setFilter(pokemonByType);
  };

  const comboName = data.map((poke, id) => {
    return { value: `${id}`, label: `${poke.name}` };
  });
  const comboId = data.map((poke, id) => {
    return { value: `${id}`, label: `${poke.id}` };
  });
  const comboType = type.map((type, id) => {
    return { value: `${type.id}`, label: `${type.name}` };
  });

  // console.log(filter);
  const tableData = filter.map((poke) => {
    return {
      Numero: `${poke.id}`,
      Pokemon: `${poke.name}`,
      Foto: <img src={poke.sprites.front_default} />,
    };
  });
  // console.log(tableData);

  const columns = [
    {
      name: "Numero",
      selector: "Numero",
      sortable: true,
      grow: 1,
    },
    {
      name: "Pokemon",
      selector: "Pokemon",
      sortable: true,
      grow: 1,
    },
    {
      name: "Foto",
      selector: "Foto",
      sortable: true,
      grow: 1,
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.Pokemon == "charizard",
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
      },
    },
  ];

  return (
    <div className="App">
      {/* <BoxLoading /> */}

      <div className="optionsContainer">
        <div className="labelContainer">
          <p> Pokemon : </p>
          <Select
            className="item"
            options={comboName}
            onChange={handleInputChange}
            placeholder="Choose a Pokemon..."
          />
        </div>
        <div className="labelContainer">
          <p> # : </p>
          <Select
            className="item"
            options={comboId}
            onChange={handleInputChange}
          />
        </div>
        <div className="labelContainer">
          <p> Type : </p>
          <Select
            className="item"
            options={comboType}
            onChange={handleInputChangeType}
            placeholder="Choose a Type..."
          />
        </div>
      </div>

      <div className="tableContainer">
        {loading ? (
          <ReactLoading type="spinningBubbles" color="#000" />
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            title="Pokedex By Mr. EH"
            conditionalRowStyles={conditionalRowStyles}
            
            // noHeader
            // fixedHeader
            pagination
            paginationPerPage={6}
            selectableRows
            selectableRowsHighlight
          />
        )}
      </div>
    </div>
  );
}

export default App;
