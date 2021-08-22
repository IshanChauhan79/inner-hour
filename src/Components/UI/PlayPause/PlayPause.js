import React from "react";
import classes from "./PlayPause.module.css";

function PlayPause(props) {
  return (
    <div className={classes.PlayPause} onClick={props.clicked}>
      {props.children}
    </div>
  );
}

export default PlayPause;
