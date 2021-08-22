import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className={classes.Header}>
      <div className={classes.NavigationItems}>
        <div>
          <NavLink
            to="/"
            className={classes.NavigationItem}
            activeStyle={{ "boxShadow": "inset 0 0 10px 0px var(--clr-red),0 0 10px 0px var(--clr-red)" }}
            exact
          >
            List
          </NavLink>
        </div>
      </div>
      <div className={classes.NavigationItems}>
        <NavLink
          to="Clock"
          className={classes.NavigationItem}
          activeStyle={{ "boxShadow": "inset 0 0 10px 0px var(--clr-red),0 0 10px 0px var(--clr-red)" }}
          exact
        >
          Clock
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
