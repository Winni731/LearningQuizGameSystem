import React from 'react';
import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { LocalDining } from '@mui/icons-material';
// import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import UserFieldsContext from "../context/UserFieldsContext";
import { AuthContext } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { ImageList, ImageListItem, ImageListItemBar, Paper, Button, Tooltip } from "@mui/material";
import useQuizzes from '../hooks/useQuizzes';
import { Link } from "react-router-dom";
// import { Star } from "@mui/icons-material";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SideMenu from './Sidebar';
import "./Dashboard.css";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDoc, docRef } from "@firebase/firestore";

const OwnedQuiz = () => {
    const quizzes = useQuizzes();
    const navigate = useNavigate();
    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);
    const [bookmark, setBookmark] = useState([]);

    if (quizzes.status === "loading") return <p>loading...</p>
    if (quizzes.status === "error") return <p>Something is wrong</p>
    if (quizzes.isEmpty) return <p>No Quizzes Found</p>

    const data = quizzes.results;


    const deleteQuiz = async (quizID) => {
        // setQuizState((prev) => ({...prev, status: "deleting", error: null}))
        console.log("deleteing!")
        try {
            // await db.collection("quizzes").doc(quizID).delete()
            // setQuizState({status: "deleted", snapshot: null, error: null})
            const docRef = doc(db, "quizzes", quizID);
            await deleteDoc(docRef)
            console.log("deleted")
            // setQuizState({status: "deleted", snapshot: null, error: null})

        }
        catch(error) {
            console.error(error)
            // setQuizState((prev) => ({...prev, status: "error", error}))
        }
        // navigate("user/ownedquiz")
        window.location.reload();
    }

    const ownedList = () => (
        <ImageList cols={3} sx={{ margin: 3 }}>
        {data?.map(
            (quiz, i) => (
                ( quiz.data.authorID === userFields.userID ) && (
            <Paper key={i} elevation={3} sx={{ margin: 5, ":hover": { boxShadow: 10 } }}>
                <ImageListItem sx={{ margin: 5 }}>
                    <div style={{height: "70%"}}>
                    <Tooltip title="Delete" arrow>
                    <DeleteOutlined style={{fontSize: "25px", 
                                          marginRight: "5px", 
                                          float: "right", 
                                          alignItems: "center", 
                                          paddingTop: "5px", 
                                          color: "grey",
                                       }}
                                  onClick={()=>{deleteQuiz(quiz.id)}}/>
                    </Tooltip>
                    <ImageListItemBar title={quiz.data.field} subtitle={quiz.data.difficulty? `Difficulty: ${quiz.data.difficulty}` : `Difficulty: Unknown`} position="below"/>
                    <ImageListItemBar title={quiz.data.title} 
                                      subtitle={quiz.data.authorName? `by: ${quiz.data.authorName}` : `by: Anonymous`} 
                                      position="below"/>
                    </div>
                    <div style={{marginTop: "10px", height: "30%"}}>
                        <Button variant="outlined" onClick={() => {navigate(`playQuiz/${quiz.id}`)}}>Play</Button>
                        <Button variant="outlined" style={{float: "right", marginRight: "3px"}} onClick={() => {navigate(`edit-quiz/${quiz.id}`)}}>Edit</Button>
                    </div>
                </ImageListItem>
                </Paper>)
            )
        )}
    </ImageList>
    );

  return (
        <div>
        <div className="container">
        <Navbar />
        <div className="verticalAlign">
          <div className="sidebar" style={{boxShadow: '1px 2px 9px #9E9E9E'}}>
          <SideMenu />
          </div>
          <div className="allQuizzes">
          {ownedList()}
          </div>
        </div>
        </div>  
        </div>
  )
}

export default OwnedQuiz
