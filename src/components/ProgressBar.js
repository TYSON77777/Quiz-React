import React from "react";
import styles from "../styles/ProgressBar.module.css";

const ProgressBar = ({ progress }) => (
  <div className={styles.progressBar}>
    <div className={styles.filler} style={{ width: `${progress}%` }} />
  </div>
);

export default ProgressBar;
