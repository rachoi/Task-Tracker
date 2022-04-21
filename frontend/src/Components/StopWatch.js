import React from "react";
import './StopWatch.css'

import axios from 'axios';
const url = "http://localhost:5000";

const StopWatch = (props) => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [taskDesc, setTaskDesc] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");



  React.useEffect(() => {
    let interval = null;
    setTaskName(props.taskName);
    setTaskDesc(props.taskDesc);
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleSubmit = (e) => {
    const task = {
      name: taskName,
      description: taskDesc,
      elapsedTime: time,
      startTime: startTime,
      endTime: endTime
    }
    axios.post(`${url}/add`, task, {withCredentials: true}).then(
      res => {
        if(res.status >= 200 && res.status <= 299) {
          console.log(res.data);
          console.log("posted");
        //   handleClose();
          window.location.reload(false);
        }
      }
    ).catch((error) => {
      // setError("error logging out");
      console.log(error);
    });

    setTime(0);
  }

  const handleStart = e => {
      setTimerOn(true);
      setStartTime(new Date().toLocaleString());
  }

  const handleStop = e => {
        setTimerOn(false);
        setEndTime(new Date().toLocaleString());
  }

  return (
    <div className="Timers">
      <h2>Stopwatch</h2>
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button style={{backgroundColor: "rgb(51, 153, 255)"}} onClick={handleStart}>Start</button>
        )}

        {timerOn && <button onClick={handleStop}>Stop</button>}

        {!timerOn && time > 0 && (
          <button style={{backgroundColor: "rgb(51, 153, 255)"}} onClick={() => setTimerOn(true)}>Resume</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button style={{backgroundColor: "rgb(102, 255, 178)", marginTop: "10px"}} onClick={handleSubmit}>Submit</button>
        )}
        
      </div>
    </div>
  );
};

export default StopWatch;