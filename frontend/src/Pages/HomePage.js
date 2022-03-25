import axios from 'axios';
import React, {useEffect} from 'react';
import Home from "../Components/Home.js";

const HomePage = (props) => {
    // const url = 'https://banking-system-rc.herokuapp.com';
    const url = 'http://localhost:3000';
    // const url = 'http://localhost:5000';
  
    useEffect( () => {
      //if trying to access home page and we find a user, redirect back to dashboard
    //   axios.get(`${url}/auth/user`)
    //   .then(res => {
    //     if(res.data) {
    //         props.history.push("/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
      
    }, [props.history]); //empty array at the end makes it only run on mount and unmount 
  
    return (
      <div> 
        <Home/>
      </div> 
    );
  }
  
  export default HomePage;