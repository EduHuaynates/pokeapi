export const Columns = [
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
  {
    name: "Edit",
    cell: () => (
      <button className="edit_Button"  >
        <i className="fas fa-edit"></i>
        Edit
      </button>
    ),
    // ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
    // grow: 1,
  },
  {
    name: "Delete",
    cell: () => (
      <button className="delete_Button"  >
        <i className="fas fa-trash"></i>
        Delete
      </button>
    ),
    // ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
    // grow: 1,
  },
];

export const ConditionalRowStyles = [
  {
    when: (row) => row.Pokemon == "charizard",
    style: {
      backgroundColor: "rgba(63, 195, 128, 0.9)",
      color: "white",
    },
  },
];

//   export default = { colums ,conditionalRowStyles}
