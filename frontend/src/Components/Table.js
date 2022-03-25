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



function createData(id, name, description, elapsedTime, date) {
  return { id, name, description, elapsedTime, date };
}

let rows = [
];

export default function BasicTable(props) {
    const [list, setList] = React.useState({});

    useEffect( () => {
        // console.log("Use effect in table");
        if(props.list.length > 0) {
            // console.log("List: " + props.list);
            rows = [];
            for(let i = 0; i < props.list.length; i++) {
                let task = props.list[i];
                const id = task.id;
                const name = task.name;
                const description = task.description;
                const elapsedTime = task.elapsedTime;
                const date = task.date;
                // console.log(name);
                // console.log(description);
                // console.log(elapsedTime);
                // console.log(date);
                rows.push(createData(id, name, description, elapsedTime, date));
            }
            // setLoading(false);
        }
        setList(props.list);
    },[props.list]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Task Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Elapsed Time</TableCell>
            <TableCell align="right">Date Completed</TableCell>
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
              <TableCell scope="string" align="right">{row.date}</TableCell>
              <TableCell scope="string" align="right">
                  <Button>
                    <DeleteIcon sx={{color: 'black'}}/>
                  </Button>
                  
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
