import AppBar from "./AppBar.js";  
import React, {useEffect, useRef} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:5000";


const Home = () => {
//   const classes = useStyles();
  const mountedRef = useRef(true);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    useEffect( () => {
      //get user info
      // console.log(loading);
      axios.get(`${url}/auth`, {withCredentials: true}).then(res=> {
        if(res.data) {
          navigate("/dashboard");
        }
        setLoading(false);
      }).catch((err) => {
        // not needed
        console.log(err);
        setLoading(false);
      })
      return () => {
        mountedRef.current = false;
      }
      
    },[]);

  return (
    <div>
      <div>
        <AppBar isLoggedIn={false}/> 
        
      </div>
    </div>
    
  );
}

export default Home;