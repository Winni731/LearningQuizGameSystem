import React from 'react'
import UserFieldsContext from '../context/UserFieldsContext';
import { AuthContext } from '../context/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Dashboard.css";
import Navbar from './Navbar';
import SideMenu from './Sidebar';
import Sortbar from './sort';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { db } from '../firebase';


const History = (props) => {
    const navigate = useNavigate();
    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);
    const [result, setResult] = useState([]);
    const [sortType, setSortType] = useState("strAscending")

    useEffect(() => {
      const getResult = async () => {
        if (currentUser.uid) {
          setResult([])
          try {
            const docRef = doc(db, "users", currentUser.uid)
            const snapshot = await getDoc(docRef)
            setResult(snapshot.data().history)
        }
        catch (error) {
            console.log(error)
            // setQuizState({status: "error", snapshot: null, error});
        }
          // const resultDoc = await getDoc(doc(db, "users", currentUser.uid), {
             
            // history: 
            // setResult(userFields?.history)
          }
      }
      getResult();
    },[currentUser.uid])

    console.log("result: "+result)

        // sort price low to hight
        const numAscending = [...result].sort((a, b) => a.score - b.score);

        // sort price high to low
        const numDescending = [...result].sort((a, b) => b.score - a.score);
    
        // sort name a - z
        const strAscending = [...result].sort((a, b) => (a.title > b.title ? 1 : -1));
    
        // sort name z - a
        const strDescending = [...result].sort((a, b) => (a.title > b.title ? -1 : 1));
    
        useEffect(() => {
            switch (sortType) {
                case "ScoreAscending":
                    setResult(numAscending);
                    break;
                case "ScoreDescending":
                    setResult(numDescending);
                    break;
                case "NameDescending":
                    setResult(strDescending);
                    break;
                case "NameAscending":
                    setResult(strAscending);
                    break;
                default:
                    break;
            }
        }, [sortType]);

        console.log("here's result: "+result)


  return (
    <div>

    <div className="container">
    <Navbar />
    <div className="verticalAlign">
      <div className="sidebar" style={{boxShadow: '1px 2px 9px #9E9E9E'}}>
      <SideMenu />
      </div>
      <div className="allQuizzes"  style={{margin: "5 5 5 5"}}>
        <Sortbar sortType={sortType} setSortType={setSortType}/>
        <h2 style={{textAlign: "center"}}>History Result</h2>
      {(userFields && currentUser) && (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Quiz Title</TableCell>
                  <TableCell align="center">Author</TableCell>
                  <TableCell align="center">Field</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Result</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.authorName}</TableCell>
                    <TableCell align="center">{row.field}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center">{row.isPass}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}                                  
    </div>
    </div>
    </div>
    </div>
  )
}

export default History
