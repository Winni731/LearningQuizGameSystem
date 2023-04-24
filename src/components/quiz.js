import React from 'react'

const quiz = ({ id, data }) => {
    let { title, field, description, authorName} = data;

    if (!title) title = "Untitled Quiz"
    if (!field) field = "no field"
    if (!description) description = "No descriotipn provided."
    if (!authorName) authorName = "Anonymous"
    return (
        <div className="quiz-container">
            {/* <img className="img" src={product.product.img} /> */}
            <div className="quiz-details">
                <p className="quiz-title">{title}</p>
                <p className="quiz-field">{field}</p>
                <p className="quiz-author">{authorName}</p>
                <div className="price-container">
                </div>
            </div>
            <br />
        </div>
    );
}

export default quiz
