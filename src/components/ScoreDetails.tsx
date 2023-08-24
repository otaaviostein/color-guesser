import React, { useContext } from 'react';
import { GameContext } from '../context/gameContext';
import styles from '../styles/ScoreDetails/styles.module.scss';

const CombinedScoreInfo = () => {
  const { handleReset, totalTimeRemaining, isStarted, highScore, score } = useContext(GameContext);

  const handleRestart = () => {
    handleReset();
  };

  return (
    <div className={styles.gamescore}>
      <div className={styles.remaining}>
        <p>Remaining time</p>
        <span style={{ color: totalTimeRemaining < 10 ? 'red' : 'black' }}>
          {totalTimeRemaining}
        </span>
      </div>
      <button className={styles.restart} onClick={handleRestart} disabled={!isStarted}>
        Restart
      </button>
      <div className={styles.score}>
        <p>High Score</p>
        <span>{highScore}</span>
        <p>Score</p>
        <span>{score}</span>
      </div>
    </div>
  );
};

export default CombinedScoreInfo;
