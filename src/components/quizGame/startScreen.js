import React from "react";
import { Timestamp } from "firebase/firestore";
import "./startScreen.css";
import { Button } from "@mui/material";

export default function StartScreen({ quizData, onPlayClick }) {
    let { title, description, difficulty, authorName, questions, lastModifiedAt } = quizData;

    if (!title) title = "Untitled Quiz";
    if (!description) description = "No description provided by the author."
    if (!authorName) authorName = "Anonymous";
    if (!questions) questions = [];
    if (!difficulty) difficulty = "Unknown";

    function convert(lastModifiedAt) {
        const fieldVal = lastModifiedAt;
        const timeStamp = new Timestamp(fieldVal.seconds, fieldVal.nanoseconds);

        return timeStamp.toDate();
    }

    const canPlay = questions.length >0;
    const modifiedString = lastModifiedAt ? `Last modified on ${convert(lastModifiedAt)}` : "";

    return (
        <div className="startScreen">
            <h1>{title}</h1>
            <h2>Description</h2>
            <p className="startScreen__description">{description}</p>
            <h2>Details</h2>
            <ul className="startScreen__detail_list">
                <li>Created by {authorName}</li>
                <li>Difficulty: {difficulty}</li>
                {modifiedString && <li>{modifiedString}</li>}
                <li>{questions.length} questions</li>
            </ul>
            {!canPlay && <p>Cannto play this quiz - it has no questions yet!</p>}
            <button disabled={!canPlay} onClick={onPlayClick} className="startScreen__play_button">
                Play
            </button>
        </div>
    )


}

