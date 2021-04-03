import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

import "./Timer.css";

const Timer = ({ playTick, startTimer, stopRound }) => {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(10);
    setIsActive(false);
  }

  function extendTime(t) {
    const currentTime = seconds + t;
    setSeconds(currentTime);
  }

  useEffect(() => {
    let interval = null;
    if (startTimer) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          toggle();
          setSeconds(10);
          stopRound();
          console.log("time over");
        }
        setSeconds((seconds) => seconds - 1);
        if (seconds <= 5 && seconds > 0) {
          playTick();
        }
      }, 1000);
    } else if (!startTimer && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, playTick, startTimer]);

  return (
    <div className='timer-outer'>
      {startTimer ? (
        <div className='timer'>
          <div className='time'>{seconds != -1 ? `${seconds} s` : "!!"}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Timer;
