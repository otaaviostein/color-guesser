import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/gameContext';
import styles from '../styles/ProgressBar/styles.module.scss';

const ProgressBar = () => {
  const app = useContext(GameContext);
  const [progressBarSize, setProgressBarSize] = useState(100);

  useEffect(() => {
    const remainingTime = Math.floor((100 * app.totalTimeRemaining) / app.timeLimit);
    setProgressBarSize(remainingTime);
  }, [app.totalTimeRemaining]);

  return (
    <div className={styles.progress}>
      <span style={{ width: `${progressBarSize}%` }}></span>
    </div>
  );
};

export default ProgressBar;
