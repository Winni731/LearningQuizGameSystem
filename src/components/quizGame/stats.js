import React from 'react';
import "./stats.css";

// score && current question number
function Stat({ label, value }) {
    return (
        <li className="stats__stat_container">
            <div className="stats__stat_label">{label}</div>
            <div className="stats__stat_value">{value}</div>
        </li>
    )
}


function Stats ({ score, questionNumber, totalQuestions }) {

  return (
    <ul className="stats">
        <Stat label="Score" value={score} />
        <Stat label="Question" value={`${questionNumber} / ${totalQuestions}`}>{score}</Stat>
    </ul>
  )
}

export default Stats
