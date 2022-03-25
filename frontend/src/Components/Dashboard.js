import AppBar from "./AppBar.js";  
import React, {useEffect, useRef} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from './Table';
import Backdrop from './Backdrop';



const url = "http://localhost:5000";


function ResponsiveDrawer(props) {

    const mountedRef = useRef(true);
    // const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState([]);
    const navigate = useNavigate();
    useEffect( () => {
      //get user info
      axios.get(`${url}/auth`, {withCredentials: true}).then(res=> {
        if(res.data) {
          setList(res.data.completedTasks);
          // console.log("Set list to: " + JSON.stringify(res.data.completedTasks));
          // console.log("set user to " + JSON.stringify(res.data));

          // setLoading(false);
        }
        else{
            navigate("/");
        }
      }).catch((err) => {
        console.log(err);
        // setLoading(false);
      })
      return () => {
        mountedRef.current = false;
      }
      
    },[]);


  const handleSubmit = e => { 

  }    
  
  return (
      <div>
          <AppBar isLoggedIn={true}/> 
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90px", width:"90%", borderRadius: "10px", marginTop:"20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              {/* <Button onClick={addTask}>           
                <AddIcon/>
              </Button> */}
              <Backdrop/>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"90%", marginTop:"20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              <Typography component="h1" variant="h5"sx={{margin:"20px 0px"}}>
                Completed Tasks
              </Typography>
              <Divider/>
              <Table list={list}/>     
            </div>
          </div>
      </div>
    )   
}
  
  export default ResponsiveDrawer;