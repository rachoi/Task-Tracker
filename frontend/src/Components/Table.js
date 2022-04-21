import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';



function createData(id, name, description, elapsedTime, startTime, endTime) {
  return { id, name, description, elapsedTime, startTime, endTime };
}

let rows = [
];

const msToHMS = ms => {
   // 1- Convert to seconds:
   var seconds = ms / 1000;

   // 2- Extract hours:
   var hours = parseInt(seconds / 3600); // 3600 seconds in 1 hour
   seconds = parseInt(seconds % 3600); // extract the remaining seconds after extracting hours
 
   // 3- Extract minutes:
   var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
 
   // 4- Keep only seconds not extracted to minutes:
   seconds = parseInt(seconds % 60);
 
   // 5 - Format so it shows a leading zero if needed
   let hoursStr = ("00" + hours).slice(-2);
   let minutesStr = ("00" + minutes).slice(-2);
   let secondsStr = ("00" + seconds).slice(-2);
 
   return hoursStr + ":" + minutesStr + ":" + secondsStr
}


export default function BasicTable(props) {
    const [list, setList] = React.useState({});

    useEffect( () => {
        // console.log("Use effect in table");
        if(props.list.length > 0) {
            rows = [];
            for(let i = 0; i < props.list.length; i++) {
                let task = props.list[i];
                const id = task.id;
                const name = task.name;
                const description = task.description;
                const elapsedTime = msToHMS(task.elapsedTime);
                const startTime = task.startTime;
                const endTime = task.endTime
    
                rows.push(createData(id, name, description, elapsedTime, startTime, endTime));
            }
        }
        setList(props.list);
    },[props.list]);

    const deleteOnClick = e => {
      e.preventDefault();
      console.log("Deleting");
    }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Task Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Elapsed Time</TableCell>
            <TableCell align="right">Time Started</TableCell>
            <TableCell align="right">Time Completed</TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="string" align="left">
                {row.id}
              </TableCell>
              <TableCell scope="string" align="right">
                {row.name}
              </TableCell>
              <TableCell scope="string" align="right">{row.description}</TableCell>
              <TableCell scope="string" align="right">{row.elapsedTime}</TableCell>
              <TableCell scope="string" align="right">{row.startTime}</TableCell>
              <TableCell scope="string" align="right">{row.endTime}</TableCell>
              <TableCell scope="string" align="right">
                  <Button>
                    <DeleteIcon onClick={deleteOnClick} sx={{color: 'black'}}/>
                  </Button>
                  
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
