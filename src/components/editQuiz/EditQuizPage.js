import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useQuiz from '../../hooks/useQuiz';
import { db } from '../../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { getNewQuizID } from '../../firebase';
import QuizForm from './quizForm';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import UserFieldsContext from '../../context/UserFieldsContext';
import Navbar from '../Navbar';


const EditQuizPage = () => {
    const {id} = useParams();
    const isNew = id === "new";
    // const [newData, setNewData] = useState([]);
    // const getNewQuizID = async () => {
    //     const newQuizIDRef = doc(collection(db, "quizzes"));
    //     await setDoc(newQuizIDRef, {})
    //     return newQuizIDRef.id;
    // }

    const [quizID] = useState(isNew ? getNewQuizID() : id);
    const quiz = useQuiz(quizID);
    const { currentUser } = useContext(AuthContext);
    const { userFields } = useContext(UserFieldsContext);
    const Navigate = useNavigate()

    // console.log("current user is: "+currentUser.uid) 
    // console.log("this is user info "+userFields)
    // console.log(userFields.name)

    // quiz.set({ title: "", description: "" })
    // quiz.delete()
    const saveQuiz = (newQuizData) => {
        console.log("saving")
        console.log(newQuizData)
        const authorID = userFields.userID;
        const authorName = userFields.name;
        const lastModifiedAt = serverTimestamp();
        const data = {...newQuizData, authorID, authorName, lastModifiedAt};
        if (!quiz.exists) data.createdAt = lastModifiedAt;
        // console.log(data)
        quiz.set(data)
        Navigate("/user/dashboard");
    }

    const deleteQuiz = () => {
        console.log("deleting")
        quiz.delete();
        Navigate("/user/dashboard");
    }

    if (quiz.status === "loading") {
        return <p>Loading...</p>
    }
    if (quiz.status === "success" && quiz.exists && quiz.data.authorID !== currentUser.uid) {
        return <div>
            <p>Edit Quiz</p>
            <p>You don't have permission to edit "{quiz.data.title}"</p>
            </div>
    }

    let message;
    if (quiz.status === "deleting") {
        message= <p>Deleting...</p>
    }
    else if (quiz.status === "deleted") {
        message= <p>Deleted!</p>
    }
    else if (quiz.status === "error") {
        message= <p>Something went wrong. Please try again...</p>
    }

  return (
    <div style={{backgroundColor: "#9ea0a2"}}>
      <div>
        <Navbar />
      </div>
      {/* <h1>Edit Quiz</h1> */}
      {message}
      <div style={{paddingBottom: "40px"}}>
      <QuizForm initialData={quiz.data} onSave={saveQuiz} onDelete={deleteQuiz} />
      </div>
    </div>
  )
}

export default EditQuizPage
