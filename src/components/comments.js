import React from 'react'
import {
    Button,
    Box,
    Card,
    CardContent,
    IconButton,
    Typography,
    CardActions,
    TextField,
    MenuItem,
} from "@mui/material";
import { getDoc } from 'firebase/firestore';
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import Navbar from './Navbar';
import UserFieldsContext from '../context/UserFieldsContext';
import { AuthContext } from '../context/AuthContext';

const Comments = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState("");
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);

    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getComments = async () => {
            if (currentUser && id) {
                const commentsDoc = await getDoc(doc(db, "comments", id));
                if (commentsDoc.exists()) {
                    const comts= commentsDoc.data().comments;
                    setComments(comts);
                }
                else {
                    console.log("no doc exists");
                }
            }
        }
        getComments();
    }, [])



    const createComments = async () => {
        const newComment = {
            date: Timestamp.now(),
            quizID: id,
            title: quiz.title,
            quizAuthor: quiz.authorName,
            reviewerID: currentUser.uid,
            reviewerName: userFields?.name,
            message: message,
        };

        // let currtComments = 

        const commentDoc = await getDoc(doc(db, "comments", id));
        if (!commentDoc.exists()) {
            await setDoc(doc(db, "comments", id), {
                comments: [],
            })
        }

        // console.log("commentDoc data"+commentDoc.data().comments[0].message)
        // setComments(commentDoc.comments)

        await updateDoc(doc(db, "comments", id), {
            comments: arrayUnion(newComment),
        }).then(() => {
            setComments([...commentDoc.data().comments, newComment])
            // window.location.reload();
        })
    }

    function GetQuiz() {
        useEffect(() => {
            const getThisQuiz = async () => {
                const docSnap = await getDoc(doc(db, "quizzes", id));
                let content = docSnap.data();
                setQuiz(content);
            }
            getThisQuiz();
        }, [])
        return quiz;
    }
    GetQuiz();

    const quizCard = () => (
        <Card
        sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 5,
            display: "flex",
            maxWidth: "70%",
        }}
        raised
    >
        <Box
            sx={{
                marginLeft: 5,
                marginRight: 5,
                marginTop: "auto",
                marginBottom: "auto",
            }}
        >
            {/* <img src={product.img} loading="eager" /> */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1" }}>
                <Typography variant="h4">{quiz.field + " - " + quiz.title}</Typography>
                <Typography variant="h5">{quiz.authorName}</Typography>
                <Typography variant="h5">{quiz.grade}</Typography>
                <Typography variant="h5">{quiz.difficulty}</Typography>
                <Typography variant="body1">{quiz.description}</Typography>
            </CardContent>
        </Box>
    </Card>
);

const writeCommentCard = () => (
    <Card
        sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 5,
            maxWidth: "70%",
        }}
    >
        <CardContent>
            <Typography variant="h5" marginBottom={3}>
                Comment this quiz
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <TextField
                    label="Add a comment"
                    sx={{ flexGrow: 3 }}
                    multiline
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Box>
        </CardContent>
        <CardActions>
            <Box sx={{ marginBottom: 1, marginRight: 1, marginLeft: "auto", display: "flex" }}>
                <Button variant="contained" onClick={createComments}>
                    Submit
                </Button>
            </Box>
        </CardActions>
    </Card>
);
console.log(comments)

const commentsCard = () => (
    <>
        <Card
            sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 5,
                maxWidth: "70%",
            }}
        >
            <CardContent>
                <Box>
                    <Typography variant="h5" marginBottom={3}>
                        Comments
                    </Typography>
                    {comments?.map((r, i) => {
                        console.log("XXXXXXXX")
                        return (
                            <Card key={i} margin={4} style={{marginTop: "4px", marginLeft: "2px", marginBottom: "2px"}}>
                                <Typography variant="h6" style={{marginLeft: "6px"}}>{r.reviewerName}   &emsp;&emsp;<span style={{fontSize: "12px", fontStyle: "italic"}}>Commented on {r?.date?.toDate()?.toDateString()}</span> </Typography>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    disabled
                                    sx={{ "&:disabled": { color: "black" }, color: "black" }}
                                >
                                </IconButton>
                                <Typography variant="body1" sx={{ wordBreak: "break-word", marginLeft: "6px", marginBottom: "4px"}}>
                                    {r.message}
                                </Typography>
                            </Card>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    </>
);

  return (
    <div>
      <Navbar />
      {quizCard()}
      {writeCommentCard()}
      {commentsCard()}
    </div>
  )
}

export default Comments
