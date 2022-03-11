import React from "react";

export default function Question(props) {
    
    const answerButtons = props.options.map(answer => {
        return (
            <button 
            className={`answer-btn
                        ${props.roundOver && answer.isSelected && answer.isCorrect ? "correct-btn" : ""}
                        ${props.roundOver && !answer.isSelected && answer.isCorrect ? "not-selected-btn" : ""}
                        ${props.roundOver && answer.isSelected && !answer.isCorrect ? "error-btn" : ""}
                        ${!props.roundOver && answer.isSelected  ? "selected-btn" : ""}`} 
            id={answer.id}
            onClick={() => props.handleClick(props.id, answer.id)}>
                {answer.possibleAnswer}
                </button>
        )
    })

    

    React.useEffect(() => {
        document.getElementById(props.id).innerHTML = props.question
        for (let answer of props.options) {
            document.getElementById(answer.id).innerHTML = answer.possibleAnswer
        }
        
    })

    return (
        <div>
            <h1 id={props.id}>{props.question}</h1>
            <div className="answer-options">
                {answerButtons}
            </div>
            
            <hr />
        </div>
    )
}