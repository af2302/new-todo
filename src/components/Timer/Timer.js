import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [hours , setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setIntervalId(intervalId);
  })

  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    const newIntervalId = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds => seconds + 1);
      } else {
        setMinutes(minutes => minutes + 1);
        setSeconds(0);
        if (minutes < 59) {
          setMinutes(minutes =>minutes + 1);
        } else {
          setHours(hours => hours + 1);
          setMinutes(0);
        }
      }
    }, 1000);

    // записываем в intervalId результат выполнения ф-и setInterval
    setIntervalId(newIntervalId)
  };

  const stopTimer = (props) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    // при остановке таймера передаем его данные в компонент App
    const { id, changeTimer } = props;
    const newTimerData = { hours, minutes, seconds, intervalId };
    changeTimer(id, newTimerData);
  };

  const strOutput = (val) => {
    const newStr = String(val);
    // eslint-disable-next-line prefer-template
    return newStr.length === 1 ? '0' + newStr : newStr;
  };
  const secondsOutput = strOutput(seconds);
  const minutesOutput = strOutput(minutes);
  const hoursOutput = strOutput(hours);
  return (
    <span className="description">
      <button className="icon icon-play" type="button" aria-label="icon-play " onClick={startTimer} />
      <button className="icon icon-pause" type="button" aria-label="icon-pause" onClick={stopTimer} />
      {hoursOutput}:{minutesOutput}:{secondsOutput}
    </span>
  )
}

export default Timer;