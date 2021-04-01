import React, { useState, useEffect } from 'react';

const Timer = (props) => {
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
    if (isActive) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          toggle();
        }
        setSeconds((seconds) => seconds - 1);
        if (seconds <= 5 && seconds > 0) {
          props.playTick();
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      {props.startTimer ? (
        <div className='timer'>
          <div className='time'>{seconds != -1 ? `${seconds} s` : '!!'}</div>
          <button onClick={toggle}>t</button>
        </div>
      ) : null}
    </>
  );
};

export default Timer;
