import { useState } from "react";
import { Link } from "react-router-dom";

import { Options } from "../layout/sideBar";

export default function SideBar() {
  const [active, setActive] = useState(false);
  const [indexActive, setindexActive] = useState();
  const handleToggle = () => {
    setActive(() => {
      return !active;
    });
  };

  const btn_toggle = active ? "btn_Options" : "btn_Options btn_active";
  const container_toggle = active
    ? "SideBar_Container container_active"
    : "SideBar_Container";

  return (
    <div className={container_toggle}>
      <button className={btn_toggle} onClick={handleToggle}>
        <i className="fas fa-angle-double-right display-menu"></i>
      </button>
      <ul className="SideBar_Navigation">
        {Options.map((option, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                let newIndex = indexActive == index ? null : index;
                setindexActive(newIndex);
              }}
              className={
                indexActive == index ? option.c_act_Name : option.c_Name
              }
            >
              <Link className="SideBar_Link" to={option.path}>
                <i className={option.icon}></i>
                <p
                  className={
                    active ? option.t_className : option.t_act_className
                  }
                >
                  {option.text}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
