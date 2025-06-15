import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import styles from "../styles/Results.module.css";

const Results = () => {
  const { score, answers, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  return (
    <div className={styles.results}>
      <h1>Quiz Results</h1>
      <p>
        Your Score: {score} / {answers.length}
      </p>
      <div className={styles.answers}>
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`${styles.answer} ${
              answer.isCorrect ? styles.correct : styles.wrong
            }`}
          >
            <p>
              <strong>Q:</strong> {answer.question}
            </p>
            <p>
              <strong>Your Answer:</strong> {answer.selectedOption}
            </p>
          </div>
        ))}
      </div>
      <button
        className={styles.restartButton}
        onClick={() => {
          resetQuiz();
          navigate("/");
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
