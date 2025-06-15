import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import quizData from "../data/quizData";
import { CSSTransition } from "react-transition-group";
import styles from "../styles/Quiz.module.css";
import "../styles/Transitions.css";

const Quiz = () => {
  const { score, setScore, setAnswers } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10);
  const [inProp, setInProp] = useState(true); // For CSSTransition
  const navigate = useNavigate();
  const questionNodeRef = useRef(null); // Add nodeRef

  useEffect(() => {
    if (timer === 0) {
      handleWrongAnswer();
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerSubmit = () => {
    const isCorrect = selectedOption === quizData[currentQuestion].answer;

    if (isCorrect) {
      setScore(score + 1);
      setAnswers((prev) => [
        ...prev,
        {
          question: quizData[currentQuestion].question,
          selectedOption,
          isCorrect,
        },
      ]);

      // Move to the next question with animation
      setInProp(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setTimer(10);
        setInProp(true);
      }, 500);
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setAnswers((prev) => [
      ...prev,
      {
        question: quizData[currentQuestion].question,
        selectedOption,
        isCorrect: false,
      },
    ]);
    navigate("/results");
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.progress}>
        Question {currentQuestion + 1} / {quizData.length}
      </div>
      <CSSTransition
        in={inProp}
        timeout={500}
        classNames="fade"
        nodeRef={questionNodeRef} // Attach nodeRef
        unmountOnExit
      >
        <div
          key={currentQuestion}
          className={styles.questionContainer}
          ref={questionNodeRef}
        >
          <h2>{quizData[currentQuestion].question}</h2>
          <div className={styles.options}>
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${
                  selectedOption === option ? styles.selected : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </CSSTransition>
      <div className={styles.footer}>
        <p>Time Left: {timer}s</p>
        <button
          className={styles.nextButton}
          onClick={handleAnswerSubmit}
          disabled={!selectedOption}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
