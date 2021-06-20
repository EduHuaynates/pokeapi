import React from "react";
import logo from "../assets/images/pikachu.svg";

export default function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar_container">
        <img className="logo" src={logo} alt="pikachu" />
        {/* <img className="logo" src="https://image.flaticon.com/icons/png/512/188/188987.png" alt="pikachu" />   */}
        <ul>
          <li className="navOptions">Home</li>
          <li className="navOptions">Perfil</li>
          <li className="navOptions">User</li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
