import React from "react";
import {nanoid} from "nanoid";
import Question from "./components/Question"

export default function App() {
    const [quizzes, setQuizzes] = React.useState([]);
    const [reset, setReset] = React.useState(false);
    const [quizPage, setQuizPage] = React.useState(false);
    const [correctAnswersNumber, setCorrectAnswersNumber] = React.useState(0);
    const [roundOver, setRoundOver] = React.useState(false);
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then(res => res.json())
            .then(data => setQuizzes(
                data.results.map(question => {
                    let shuffledAnswers = shuffleOptions([...question.incorrect_answers, question.correct_answer])

                    return({
                        id: nanoid(),
                        question: question.question,
                        answerOptions: shuffledAnswers.map(answer => {
                            return {
                                id: nanoid(),
                                possibleAnswer: answer,
                                isCorrect: answer === question.correct_answer ? true : false,
                                isSelected: false
                            }
                            
                            
                        }),
                        answer: question.correct_answer,
                        // add as necessary
                    })

                })))
    }, [reset])


    function createQuiz() {
        setQuizPage(true)
        console.log(quizzes)
    }

    function handleClick(questionId, selectedAnswerId) {
        setQuizzes(prev => {
            let answers = prev.find(question => question.id === questionId).answerOptions
            answers.map(answer => answer.isSelected = false)
            answers.find(answer => answer.id === selectedAnswerId).isSelected = true
            return [...prev]
        })
    }

    function tallyAndEndRound() {
        setRoundOver(true)

    }

    function goBack() {
        setQuizPage(false)
    }

    function incrementCorrectAnswer() {
        setCorrectAnswersNumber(prev => prev + 1)
    }

    function shuffleOptions(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      const renderQuiz = quizzes.map(question => {
          return (<Question
                    key={question.id}
                    id={question.id}
                    question={question.question}
                    options={question.answerOptions}
                    answer={question.answer}
                    handleClick={handleClick}
                    roundOver={roundOver}/>
                    
                )
      })

    return (
        <main>
            { quizPage === false ?
                <div className="intro-container">
                    <h1>Quizzical</h1>
                    <p>The ultimate quiz app. Test your general knowledge of things and find out if you're as smart as you thought.</p>
                    <button className="start-btn" onClick={createQuiz}>Start Quiz</button>
                </div>
                :
                <div>
                    {renderQuiz}
                    <div className='end-section'>
                        <button className="end-btn" onClick={goBack}>Check Answers</button>
                    </div>
                    
                    
                </div>
            }
        </main>
    )
}