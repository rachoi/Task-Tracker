import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const url = "http://localhost:5000";



export default function ButtonAppBar(props) {
  const[isLoggedIn, setIsLoggedIn] = React.useState("");
  const navigate = useNavigate();

  useEffect( () => {
      setIsLoggedIn(props.isLoggedIn);
  }, [props])

  const logout = (e) => {
    axios.delete(`${url}/logout`, {withCredentials: true}).then(
      res => {
        if(res.status >= 200 && res.status <= 299) {
          // console.log("logged out");
          navigate("/");
        }
      }
    ).catch((error) => {
      // setError("error logging out");
      console.log(error);
    });
  }

  // const get = (e) => {
  //   axios.get(`${url}/auth`, {withCredentials: true}).then(
  //     res => {
  //       if(res.status >= 200 && res.status <= 299) {
  //         console.log(res.data);
  //         console.log("got");
  //       }
  //     }
  //   ).catch((error) => {
  //     // setError("error logging out");
  //     console.log(error);
  //   });
  // }

  const loginOnclick = e => {
    navigate("/login");
  }

  const redirectHome = e => {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "white"}}>
        <Toolbar>
          
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button onClick={redirectHome} sx={{color: "black", fontSize: "20px"}}> 
                Task Tracker
              </Button>
            </Typography>
          

          {/* <Button color="inherit" onClick={get} sx={{textDecoration: 'none', color: "black"}}>get</Button>

          <Button color="inherit" onClick={logout} sx={{textDecoration: 'none', color: "black"}}>Log out</Button> */}

          {isLoggedIn ? <Button color="inherit" onClick={logout} sx={{textDecoration: 'none', color: "black"}}>Log out</Button> : 
            <Button onClick={loginOnclick} color="inherit" sx={{textDecoration: 'none', color: "black"}}>Login</Button>
          }
          
          
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}