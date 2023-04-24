import React from 'react'
import shuffle from '../../helper/shuffle';
import { useState } from 'react';
import "./triviaItem.css";
import he from "he";


// indiviual question & waits for user answer

const TriviaItem = ({ correctAns, incorrectAns, question, onNextClick, onAnsSelected}) => {
    const [selectedAns, setSelectedAns] = useState(null);
    const hasPickedAns = selectedAns !== null;
    
    const allAns = [correctAns, ...incorrectAns];
    const [shuffledAns, setShuffledAns] = useState(() => shuffle(allAns));

    let nextButtonClassName = "triviaItem__button triviaItem__next_button";
    if (!hasPickedAns) {
        nextButtonClassName += " triviaItem__button__disabled";
    }


    const onAnsClick = (e) => {
        const playerAns = he.decode(e.target.innerHTML);
        console.log(playerAns)
        setSelectedAns(playerAns);
        const isCorrect = playerAns === correctAns;
        onAnsSelected(isCorrect);
    }

  return (
    <div style={{width: "60%", margin: "auto"}}>
      <p className="triviaItem__question">{question}</p>
      <ul className="triviaItem__ans">
        {shuffledAns.map((ans, i) => {
            let className = "triviaItem__button";

            if (hasPickedAns) {
                const pickedAns = ans === selectedAns;
                const isCorrect = ans === correctAns;

                if (pickedAns && isCorrect) {
                    className += " triviaItem__button__correct"
                }
                else if (pickedAns && !isCorrect) {
                    className += " triviaItem__button__incorrect"
                }
                else {
                    className +=" triviaItem__button__disabled";
                }
            }
            return (
                <li key={ans}>
                    <button className={className} 
                            onClick={onAnsClick} 
                            disabled={hasPickedAns}>{ans}</button>
                </li>
            )
        })}
      </ul>
      <button className={nextButtonClassName}
              onClick={onNextClick} 
              disabled={!hasPickedAns}>Next</button>
    </div>
  )
}

export default TriviaItem
