import { useEffect, useState } from "react";
import Select from "react-select";
import ReactLoading from "react-loading";
import DataTable from "react-data-table-component";
import Calendar from "react-calendar";
import { fetchPokemon, fetchPokemonByType, fetchData } from "../api";
import { Columns, ConditionalRowStyles } from "../layout/Tabla";
import "react-calendar/dist/Calendar.css";

export default function Explore() {
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [filter, setFilter] = useState([]);
  const [calendar, setCalendar] = useState(false);
  const [title, setTitle] = useState("Pokedex By Mr. EH");

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData("pokemon");
    getData("type");
  }, []);

  const URL_POKEMON = "https://pokeapi.co/api/v2/";

  async function getData(typeUrl) {
    try {
      setLoading(true);
      const pokeData = await fetchData(typeUrl);
      if (typeUrl == "pokemon") {
        setLoading(false);
        setData(pokeData);
      } else if (typeUrl == "type") {
        setLoading(false);
        setType(pokeData);
      }
      setLoading(false);
    } catch (error) {}
  }

  const handleInputChange = async (value) => {
    setLoading(true);
    const poke = await fetchPokemon(`${URL_POKEMON}pokemon/${value.label}`);
    setLoading(false);
    setFilter([poke]);
  };

  const handleInputChangeType = async (value) => {
    setLoading(true);
    const pokemonByType = await fetchPokemonByType(
      `${URL_POKEMON}type/${value.label}`
    );
    setLoading(false);
    setFilter(pokemonByType);
  };

  const handleDisplayCalendar = () => {
    setCalendar(() => {
      return !calendar;
    });
  };

  const handleClickDay = (value, event) => {
    setDate(value);
    setCalendar(false);
  };

  const handleFormatDate = (locale, date) => {
    [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
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

  const tableData = filter.map((poke) => {
    return {
      Numero: `${poke.id}`,
      Pokemon: `${poke.name}`,
      Foto: <img src={poke.sprites.front_default} alt={poke.name} />,
    };
  });

  return (
    <div className="main_body">
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

        <div className="labelContainer calendar_container">
          <p>Fecha Inicio:</p>
          <input
            type="text"
            name="date"
            id=""
            placeholder="Pick a Date.."
            value={date}
            disabled
          />
          {/* <div className="calendar_container"> */}
          <button className="btn_calendar" onClick={handleDisplayCalendar}>
            {" "}
            <i className="fas fa-calendar"></i>
          </button>
          {calendar && (
            <Calendar
              className="calendar"
              onClickDay={handleClickDay}
              // onChange={(date) => {
              //   setDate({ date: date.toLocaleDateString });
              // }}
              // formatLongDate={(locale, date) => formatDate(date, "dd MM YYYY")}
              formatLongDate={handleFormatDate}
              onChange={setDate}
              value={date}
            />
          )}
          {/* </div> */}
        </div>
        <div className="labelContainer">
          <input
            type="text"
            placeholder="Elige el titulo"
            onChange={handleSetTitle}
          />
        </div>
        <div className="labelContainer">
          <button className="edit_Button">
            <i className="fas fa-edit"></i>
            Edit
          </button>
          <button className="delete_Button">
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="tableContainer">
        {loading ? (
          <ReactLoading type="spinningBubbles" color="#000" />
        ) : (
          <DataTable
            columns={Columns}
            data={tableData}
            title={`Pokedex By ${title}`}
            conditionalRowStyles={ConditionalRowStyles}
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

// export default App;
