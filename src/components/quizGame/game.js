import React from 'react'
import TriviaItem from './triviaItem';
import EndScreens from './endScreen';
// import triviaData from '../../database/triviaData';
import Stats from './stats';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import StartScreen from './startScreen';
import he from "he";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import UserFieldsContext from '../../context/UserFieldsContext';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import { db } from "../../firebase";
import { useParams } from 'react-router-dom';
// import Timer from '../Timer';
// import CountDown from '../CountDown';


// flow of the quiz game
function Game({ quizData }) {
    const { userFields } = useContext(UserFieldsContext);
    const { currentUser } = useContext(AuthContext);
    const prop = useParams()
    const [gameState, setGameState] = useState({
        score: 0,
        triviaIndex: 0,
        state: "start",
        startTime: performance.now(),
        // isGameOver: false,
    })

    const [history, setHistory] = useState([])

    // console.log(quizData.questions)
    const triviaData = quizData.questions ?? [];

    const questions = triviaData?.map((item) => {
        return {
            ...item,
            question: he.decode(item.question),
            correctAns: he.decode(item.correctAns),
            incorrectAns: item.incorrectAns.map(incorrectAns => he.decode(incorrectAns))
        };
    })

    const { score, triviaIndex, state, startTime } = gameState;
    const questionNumber = triviaIndex + 1;
    const numQuestions = questions.length;
    const playTime = (performance.now() - startTime) / 1000;

    // const triviaQuestion = triviaData[triviaIndex];
    // const { correctAns, incorrectAns, question } = triviaQuestion;
    console.log("time: "+performance.now())
    // let duration = 5;

    const onRestartGame = () => {
        setGameState({
            score: 0,
            triviaIndex: 0,
            // isGameOver: false,
            state: "start",
            startTime: performance.now(),
        })
    }

    const onStart = () => {
        setGameState({
            score: 0,
            triviaIndex: 0,
            state: "running",
            startTime: performance.now(),
        })
    }

    const onLoadNextQuestion = () => {
        if (triviaIndex >= questions.length-1) {
            setGameState({ ...gameState, state: "end"});
        }
        else {
            setGameState({
                ...gameState,
                state: "running",
                triviaIndex: triviaIndex + 1,
            })
        }
    }

    const onAnsSelected = (isCorrect) => {
        if (isCorrect) {
            setGameState({
                ...gameState,
                score: score + 5,
            });
        }
    }

    async function addToHistory(quizData, score, isPass, timeTaken) {
        const newTakenQuiz = {
            quizID: prop.id,
            field: quizData.field ?? "no field",
            title: quizData.title ?? "Untitled Quiz",
            description: quizData.description ?? "No description provided by the author.",
            authorName: quizData.authorName ?? "Anonymous",
            difficulty: quizData.difficulty ?? "Unknown",
            score: score,
            isPass: isPass? "Pass" : "Fail",
            date: timeTaken,
        }
        console.log(newTakenQuiz)
        if (userFields && currentUser && state === "end") {
            await updateDoc(doc(db, "users", currentUser.uid), {
                    history: arrayUnion(newTakenQuiz),
                })
                .catch((error) => {
                    console.log(error)
                })
                setHistory(userFields.history);
          
                console.log("add to history")
            }       
    }
    
    

    let pageContent;
    let pageKey;
    // let isOver = playTime >= duration;
    // if (isOver) {
    //     setGameState({ ...gameState, state: "end"});
    // }
    // useEffect(()=> {
    //     if (isOver) {
    //         setGameState({ ...gameState, state: "end"});
    //         onLoadNextQuestion();
    //     }
    // }, [isOver])

    // console.log("playTime vs duration: "+isOver)

    if (state === "start") {
        pageKey = "QuizDetails";
        pageContent = <StartScreen quizData={quizData} onPlayClick={onStart}/>
    }
    else if (state === "end") { // add score to result
        pageKey = "EndScreen";
        pageContent = (<EndScreens score={score} 
                                   fullScore={numQuestions*5} 
                                   onRetryClick={onRestartGame} 
                                   playTime={playTime}/>)
        const date=new Date()
        let timeTaken=date.toLocaleString()
        // console.log(date.toLocaleString())
        const isPass = score >= numQuestions*5/2;
        addToHistory(quizData, score, isPass, timeTaken);
    }
    else {
        pageKey = triviaIndex;
        const triviaQuestion = questions[triviaIndex];
        const { correctAns, incorrectAns, question } = triviaQuestion;
        pageContent = (
            <div>
           {/* <CountDown seconds={30-playTime}/> */}
            <TriviaItem 
                key={pageKey}
                question={question} 
                correctAns={correctAns} 
                incorrectAns={incorrectAns}
                onNextClick={onLoadNextQuestion}
                onAnsSelected={onAnsSelected}/></div>)
    }


    return (
        <div style={{}}>
            <div style={{marginTop: "80px"}}>
            {state === "start"? "" : <Stats score={score} questionNumber={questionNumber} totalQuestions={numQuestions}/>}
            {/* {state === "start"? "" : <Timer duration={duration}/>} */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={triviaIndex}
                    initial={{opacity: 0, x: 75, transition: { ease: "easeOut" }}}
                    animate={{opacity: 1, x: 0 }}
                    exit={{opacity: 0, x: -75, transition: { ease: "easeIn" } }}
                    transition={{duration: 0.5}}>
                    {pageContent}
                </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Game;
