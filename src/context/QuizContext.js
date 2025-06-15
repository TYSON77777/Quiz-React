import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const resetQuiz = () => {
    setScore(0);
    setAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{ score, setScore, answers, setAnswers, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};
