import React, { useRef } from "react";
import classes from "./ListInput.module.css";
function ListInput(props) {
  const inputRef = useRef();
  
  const buttonCliked = (e, type) => {
    e.preventDefault();
    const value = inputRef.current.value;
    props.changed(value, type);
    inputRef.current.value = "";
  };
  const List = props.list.map((el, i) => {
    return (
      <div className={classes.ListEl} key={i}>
        {el}
      </div>
    );
  });
  return (
    <div className={classes.ListInput}>
      <div className={classes.Title}>{props.title}</div>
      {props.list.length === 0 ? null : (
        <div className={classes.ListContainer}>
          <div className={classes.ListEl}>[</div>
          {List}

          <div className={classes.ListEl}>]</div>
        </div>
      )}

      <div>
        <form onSubmit={(e) => buttonCliked(e, props.title)}>
          <input
            type="text"
            className={classes.Input}
            ref={inputRef}
            placeholder="Enter Element"
            required
          ></input>
          <button type="submit" className={classes.Button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListInput;
