import React from 'react';
import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Handshake, LocalDining } from '@mui/icons-material';
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
import { CommentOutlined } from "@ant-design/icons"; 


const AllQuizzes = (props) => {
    const quizzes = useQuizzes();
    const navigate = useNavigate();
    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);
    const [bookmark, setBookmark] = useState([]);


    if (quizzes.status === "loading") return <p>loading...</p>
    if (quizzes.status === "error") return <p>Something is wrong</p>
    if (quizzes.isEmpty) return <p>No Quizzes Found</p>

    const data = quizzes.results;

    const addToBookmark = async (quiz) => {
        console.log(quiz.data)
        const newMarkedQuiz = {
            quizID: quiz.id,
            field: quiz.data.field ?? "no field",
            title: quiz.data.title ?? "Untitled Quiz",
            description: quiz.data.description ?? "No description provided by the author.",
            authorName: quiz.data.authorName ?? "Anonymous",
            difficulty: quiz.data.difficulty ?? "Unknown",
        }
        console.log("added")
        if (userFields && currentUser) {
            let currentBookmark = userFields.bookmark;
            let marked = false;
            setBookmark(currentBookmark)

            currentBookmark.forEach((item) => {
                if (item.quizID === newMarkedQuiz.quizID) {
                    marked = true; // quiz already in bookmark
                }
            })

            if (!marked) { // add to bookmark
                await updateDoc(doc(db, "users", currentUser.uid), {
                    bookmark: arrayUnion(newMarkedQuiz),
                })
                .catch((error) => {
                    console.log(error)
                })
                setBookmark(currentBookmark)
                marked = true;
                console.log("bookmarked")
            }
            else { // remove from bookmark
                let updatedBookmark = [];
                // setBookmark(userFields.bookmark)
                // console.log(userFields.bookmark)
                // console.log("bookmark :"+bookmark);
                userFields?.bookmark.forEach((item) => {
                    if (item.quizID !== quiz.id) {
                        updatedBookmark.push(item)
                    }
                });
                await updateDoc(doc(db, "users", currentUser.uid), {
                    bookmark: updatedBookmark
                }).then(()=> {
                    setBookmark(updatedBookmark)
                    console.log("unBookmarked")
                    marked = false;
                })
                // console.log(quiz.id);
                // console.log(bookmark)

            }

        }
        else { // navigate to login
            navigate("/")
        }
    }

    function isBookmark(quiz) {
        let isMarked = false;
        let color = "grey";
        userFields.bookmark.forEach((item) => {
            if (item.quizID === quiz.id) {
                isMarked = true; // quiz already in bookmark
                color = "blue";
            }
        })
        console.log("this is "+isMarked)
        return color;
    }


    const quizList = () => (
        <ImageList cols={3} sx={{ margin: 3 }}>
        {data?.map(
            (quiz, i) => (
                quiz.data.title.toLowerCase().includes(props?.search) &&
            (<Paper key={i} elevation={3} sx={{ margin: 5, ":hover": { boxShadow: 10} }}>
                <ImageListItem sx={{ margin: 5 }}>
                    <div style={{height: "70%"}}>
                    <ImageListItemBar title={quiz.data.field} subtitle={quiz.data.difficulty? `Difficulty: ${quiz.data.difficulty}` : `Difficulty: Unknown`} position="below"/>
                    <ImageListItemBar title={quiz.data.title} 
                                      subtitle={quiz.data.authorName? `by: ${quiz.data.authorName}` : `by: Anonymous`} 
                                      position="below"/>
                    </div>
                    <div style={{marginTop: "10px", height: "30%"}}>
           
                        <Button variant="outlined" onClick={() => {navigate(`playQuiz/${quiz.id}`)}}>Play</Button>
                    <Tooltip title="comments" arrow>
                    <CommentOutlined style={{fontSize: "30px", 
                                          marginLeft: "5px", 
                                          float: "right", 
                                          alignItems: "center", 
                                          paddingTop: "5px", 
                                          hoover: { cursor: "pointer"},
                                       }}
                                  onClick={() => navigate("/user/dashboard/comments/"+quiz.id)}/>
                    </Tooltip>
                    <Tooltip title="bookmark" arrow>
                    <StarFilled style={{fontSize: "30px", 
                                          marginRight: "10px", 
                                          float: "right", 
                                          alignItems: "center", 
                                          paddingTop: "5px", 
                                          color: `${isBookmark(quiz)}`,
                                          hoover: { cursor: "pointer"},
                                       }}
                                  onClick={()=>addToBookmark(quiz)}/>     
                            </Tooltip>        
                    </div>
                </ImageListItem>
                </Paper>)
            )
        )}
    </ImageList>
    );


  return (

        <div>
  {quizList()}
        </div>
      
  );
}

export default AllQuizzes
