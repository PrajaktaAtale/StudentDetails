import React, {useEffect, useState} from 'react';
import "./Home.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


const Home = () => {
    const [Data, setdata] = useState([])

  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate('/')
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  
  const config = {
            headers: {
                //   we are finding the token from localstorage
                Authorization: localStorage.getItem("token"),
            }
        };


        // get all students--
        const fetch_student = () => {
        axios.get("http://localhost:5000/api/student/getstudent", config).then((data) => {
            setdata(data.data.student)
        })
    }

    useEffect(() => {
        fetch_student()
    }, [])


  return (
    <>
    <div className='container'>
    <div className='head'>
        Student Details
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Student Name</StyledTableCell>
          <StyledTableCell align="center">Age</StyledTableCell>
          <StyledTableCell align="center">Contact No</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Data.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="center">{row.age}</StyledTableCell>
            <StyledTableCell align="center">{row.contactNo}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  </div>
  </>
  )
}

export default Home;




