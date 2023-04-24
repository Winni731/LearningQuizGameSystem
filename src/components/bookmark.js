import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserFieldsContext from '../context/UserFieldsContext';
import { AuthContext } from '../context/AuthContext';
import { useState, useContext } from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Paper, Button, Tooltip } from "@mui/material";
import Navbar from './Navbar';
import SideMenu from './Sidebar';
import background from "../assets/girl_back.avif";
import "./Dashboard.css";
import { DeleteOutlined } from "@ant-design/icons";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";


const Bookmark = () => {
    // const quizzes = useQuizzes();
    const navigate = useNavigate();
    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);
    const [bookmark, setBookmark] = useState([]);


    const  deleteBookmark = async(quiz) => {
        console.log("deleted "+quiz.quizID)
        let updatedBookmark = [];

        userFields?.bookmark.forEach((item) => {
            if (item.quizID !== quiz.quizID) {
                updatedBookmark.push(item)
            }
        });
        await updateDoc(doc(db, "users", currentUser.uid), {
            bookmark: updatedBookmark
        }).then(()=> {
            setBookmark(updatedBookmark)
            console.log("unBookmarked")
        })
    }

    const bookmarkList = () => (
        <ImageList cols={3} sx={{ margin: 3 }}>
        {userFields?.bookmark.map(
            (quiz, i) => (
            <Paper key={i} elevation={3} sx={{ margin: 5, ":hover": { boxShadow: 10 } }}>
                <ImageListItem sx={{ margin: 5 }}>
                    <div style={{height: "70%"}}>
                    <ImageListItemBar title={quiz.field} subtitle={quiz.difficulty? `Difficulty: ${quiz.difficulty}` : `Difficulty: Unknown`} position="below"/>
                    <ImageListItemBar title={quiz.title} 
                                      subtitle={quiz.authorName? `by: ${quiz.authorName}` : `by: Anonymous`} 
                                      position="below"/>
                    </div>
                    <div style={{marginTop: "10px", height: "30%"}}>
                    {/* <Link to={`playQuiz/${quiz.id}`}> */}
                        <Button variant="outlined" onClick={() => {navigate(`playQuiz/${quiz.quizID}`)}}>Play</Button>
                        {/* </Link> */}
                    <Tooltip title="undo bookmark" arrow>
                    <DeleteOutlined style={{fontSize: "25px", 
                                          marginRight: "0px", 
                                          float: "right", 
                                          alignItems: "center", 
                                          paddingTop: "5px", 
                                          color: "grey",
                                       }}
                                  onClick={()=>deleteBookmark(quiz)}/>    
                    </Tooltip>         
                    </div>
                </ImageListItem>
                </Paper>
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
      <div className="allQuizzes"  style={{backgroundColor: "#4dd0e1"}}>
      {bookmarkList()}
      </div>
    </div>
    </div>  
    </div>
  )
}

export default Bookmark
