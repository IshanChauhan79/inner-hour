import React, { useState } from "react";
import classes from "./ListAB.module.css";
import ListInput from "./ListInput/ListInput";
function ListAB() {
  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);
  const [computeValues, setComputeValues] = useState(null);

  const listChanged = (el, type) => {
    if (type === "List A") {
      setListA((prev) => [...prev, el]);
    }
    if (type === "List B") {
      setListB((prev) => [...prev, el]);
    }
  };

  function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }

  function unique(list, common) {
    let uq = list.filter((el) => !common.includes(el));
    return uq;
  }
  const computeClicked = () => {
    if(listA.length===0 && listB.length===0){
      return;
    }
    let a = new Set(listA);
    let b = new Set(listB);
    let i = intersection(a, b);
    i = [...i];
    let onlyA = unique(listA, i);
    let onlyB = unique(listB, i);
    let both = onlyA.concat(onlyB);
    setComputeValues({
      onlyA,
      onlyB,
      i,
      both,
    });
  };

  const listElements = (array) => {
    let list = array.map((el, i) => (
      <div className={classes.Element} key={i}>
        {el}
      </div>
    ));
    list = [
      <div className={classes.Element} key="open">
        [
      </div>,
      ...list,
      <div className={classes.Element} key="close">
        ]
      </div>,
    ];
    return <div className={classes.ListContainer}>{list}</div>;
  };

  return (
    <div className={classes.ListAB}>
      <ListInput title="List A" list={listA} changed={listChanged} />
      <ListInput title="List B" list={listB} changed={listChanged} />
      <div className={classes.Compute} onClick={computeClicked}>
        Compute
      </div>
      {computeValues !== null ? (
        <div className={classes.ComputeResult}>
          <div className={classes.TitleCompute} >Elements Only in A</div>
          {listElements(computeValues.onlyA)}
          <div className={classes.TitleCompute} >Elements Only in B</div>
          {listElements(computeValues.onlyB)}
          <div className={classes.TitleCompute} >Elements Present in both A and B</div>
          {listElements(computeValues.i)}
          <div className={classes.TitleCompute} >Elements Combining both A and B (Unique)</div>
          {listElements(computeValues.both)}
        </div>
      ) : null}
    </div>
  );
}

export default ListAB;
