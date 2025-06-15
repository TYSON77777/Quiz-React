import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h1>Welcome to the Ultimate Quiz!</h1>
      <p>Test your knowledge and challenge yourself!</p>
      <button className={styles.startButton} onClick={() => navigate("/quiz")}>
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
