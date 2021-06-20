import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Main({ children }) {
  return (
    <React.Fragment>
      <NavBar />
      <main >
        <SideBar />
        {children}
      </main>
    </React.Fragment>
  );
}
