import React, { useState, useRef, useEffect, useCallback } from "react";
import classes from "./Clock.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import PlayPause from "../UI/PlayPause/PlayPause";

const pomodoroMinutes = 25;
const pomodoroBreak = 5;

function Clock() {
  const [play, setPlay] = useState(true);
  const [cycles, setCycles] = useState(0);

  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(pomodoroMinutes * 60);

  const cyclesRef = useRef();
  console.log(play,cycles,mode,secondsLeft)

  const changeMode = useCallback(() => {
    let modeType = mode;
    var time;
    if (modeType === "work") {
      time = pomodoroMinutes;
    } else {
      time = pomodoroBreak;
    }
    setSecondsLeft(time * 60);
    setCycles((prev) => (modeType === "work" ? prev : prev - 1));
    setMode((prev) => (prev === "work" ? "break" : "work"));
  }, [mode]);

  useEffect(() => {
    // console.log(cycles, secondsLeft, mode);
    if (cycles > 0 && play) {
      if (secondsLeft > 0) {
        var interval = setTimeout(() => {
          setSecondsLeft((prev) => prev - 1);
        }, 1000);
      } else {
        changeMode();
        console.log("cycle change");
      }
    }
    return () => clearInterval(interval);
  }, [cycles, secondsLeft, play, changeMode]);

  const playClicked = () => {
    setPlay((prev) => !prev);
  };
  const cycleInput = (e) => {
    e.preventDefault();
    setCycles(cyclesRef.current.value);
  };
  const cycleCancel = () => {
    setCycles(0);
    setPlay(true);
    setMode("work");
    setSecondsLeft(pomodoroMinutes * 60);
  };

  const totalSeconds =
    mode === "work" ? pomodoroMinutes * 60 : pomodoroBreak * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  let clock = (
    <div className={classes.Clock}>
      <div className={classes.Title}>Pomodoro Timer</div>
      <div className={classes.Input}>
        <div>Enter Cycle:</div>
        <form onSubmit={cycleInput}>
          <input type="number" placeholder="Cycles" ref={cyclesRef} required />
          <button>Start</button>
        </form>
      </div>
    </div>
  );
  if (cycles > 0) {
    clock = (
      <div className={classes.Clock}>
        <div>
          <CircularProgressbar
            value={percentage}
            text={minutes + ":" + seconds}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: mode === "work" ? "#f54e4e" : "#4aec8c",
              tailColor: "rgba(255,255,255,.2)",
            })}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          {play ? (
            <PlayPause clicked={playClicked}>
              <i className="far fa-pause-circle"></i>
            </PlayPause>
          ) : (
            <PlayPause clicked={playClicked}>
              <i className="far fa-play-circle"></i>
            </PlayPause>
          )}
        </div>
        <div className={classes.Cancel} onClick={cycleCancel}>
          CANCEL
        </div>
      </div>
    );
  }

  return clock;
}

export default Clock;
