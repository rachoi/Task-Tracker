import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



import axios from 'axios';


const url = "http://localhost:5000";


export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const [taskState, setTaskState] = React.useState(false); //false means not started, true means started
  const [taskName, setTaskName] = React.useState("");
  const [taskDesc, setTaskDesc] = React.useState("");
  const [error, setError] = React.useState("");
  const [totalSeconds, setTotalSeconds] = React.useState(0); //total seconds elapsed for a given task


  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const onChangeTaskName = e => {
    e.preventDefault();
    const name = e.target.value;
    setTaskName(name)
  }

  const onChangeTaskDesc = e => {
    e.preventDefault();
    const desc = e.target.value;
    setTaskDesc(desc)
  }

  const reset = () => {
      setError("");
      setTaskName("");
      setTaskDesc("");
      setStartTime("");
      setEndTime("");
      setTotalSeconds(0);
  }
  //closing menu
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  //toggling open
  const handleToggle = () => {
    setOpen(!open);
  };

  const startTrack = (e) => {
    if(taskName.length === 0) {
        setError("Required to put a name for the task");
    }
    else {
        setTaskState(true);
        let start = new Date().getTime();;
        setStartTime(start);
    }

  }

  const stopTrack = (e) => {
    setTaskState(false);
    let end = new Date().getTime();;
    const seconds = (end-startTime)/1000;
    const cur = totalSeconds + seconds; //adding total (so we can pause and continue for different times)
    setTotalSeconds(cur);

    const diff = new Date(seconds * 1000).toISOString().substr(11, 8); //hh:mm:ss
    console.log("Current elapsed: " + diff);
    console.log("Total: " + cur);
    setEndTime(end);
  }
//reset values after adding

  const addTask = (e) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const time = new Date(totalSeconds * 1000).toISOString().substr(11, 8)

    const task = {
      name: taskName,
      description: taskDesc,
      elapsedTime: time,
      date: today
    }
    axios.post(`${url}/add`, task, {withCredentials: true}).then(
      res => {
        if(res.status >= 200 && res.status <= 299) {
          console.log(res.data);
          console.log("posted");
          handleClose();
          window.location.reload(false);
        }
      }
    ).catch((error) => {
      // setError("error logging out");
      console.log(error);
    });
  }

  return (
    <div>
      <Button onClick={handleToggle}><AddIcon/></Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div  style={{width: "50%", height: "90%", backgroundColor: "white"}}>

            <div style={{display: "flex", justifyContent:"flex-end"}}>
                <Button onClick={handleClose} sx={{color: "black"}}> <CloseIcon/> </Button>
            </div>

            <div style={{display: "flex", alignItems: "center", flexDirection:"column"}}> 
                <Typography component="h1" variant="h5" sx={{color: "black"}}>
                    Create task
                </Typography>
                <Typography component="h1" variant="h5" sx={{color: "red"}}>
                    {error}
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Task name"
                    name="name"
                    autoComplete="name"
                    onChange={onChangeTaskName}
                    value={taskName}
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    name="desciption"
                    label="Desciption"
                    type="desciption"
                    id="desciption"
                    autoComplete="task-desciption"
                    value={taskDesc}
                    onChange={onChangeTaskDesc}
                    />
                    {taskState ?  
                        <div style={{display: "flex", justifyContent:"flex-end"}}>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={stopTrack}
                                >
                                Stop
                            </Button> 
                            
                        </div>
                        : 
                        <div style={{display: "flex", justifyContent:"flex-end"}}>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={startTrack}
                                >
                                Start
                            </Button>

                            <Button
                                variant="contained"
                                sx={{ mt: 3, mb: 2 , marginLeft: "15px"}}
                                onClick={addTask}
                                >
                                Submit
                            </Button> 
                        </div>
                        
                    }
                </Box>
            </div>
        </div>
      </Backdrop>
    </div>
  );
}
