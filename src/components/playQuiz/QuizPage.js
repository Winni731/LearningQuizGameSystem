import React from 'react';
import { useParams } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';
import QuizGame from './QuizGame';
import Game from '../quizGame/game';
import he from "he";
// import Timer from '../Timer';

const QuizPage = () => {
    const { id } = useParams();


    const quiz = useQuiz(id);
    console.log(quiz);


    // let quizData = quiz.data;

    // const triviaData = quizData?.map((item) => {
    //     return {
    //         ...item,
    //         question: he.decode(item.question),
    //         correctAns: he.decode(item.correctAns),
    //         incorrectAns: item.incorrectAns.map(incorrectAns => he.decode(incorrectAns))
    //     };
    // })

    let contents;
    if (quiz.status === "loading") {
        contents = <p>isLoading...</p>;
    }
    else if (quiz.status === "error") {
        contents = <p>Something went wrong, please try again</p>
    }
    else if (!quiz.isExist) {
        contents = <p>No quiz found!</p>
    }
    else {
        contents = <Game quizData={quiz.data} />
    }

  return (
    <div>
         {/* <Timer duration={30}/> */}
      {contents}
    </div>
  )
}

export default QuizPage
