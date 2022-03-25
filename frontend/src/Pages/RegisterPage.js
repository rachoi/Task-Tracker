import axios from 'axios';
import React, {useEffect} from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from "../Components/Register.js";

const RegisterPage = (props) => {
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
        <Register/>
      </div> 
    );
  }
  
  export default RegisterPage;