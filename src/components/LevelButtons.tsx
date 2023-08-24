import styles from '../styles/LevelButtons/styles.module.scss'

interface LevelButtonsProps {
  handleGameLevel: (level: GameLevel) => void;
}

function LevelButtons({ handleGameLevel }: LevelButtonsProps) {
  return (
    <div data-testid="game-buttons" className={styles.levelButtons}>
      <button onClick={() => handleGameLevel(4)}>Easy</button>
      <button onClick={() => handleGameLevel(5)}>Medium</button>
      <button onClick={() => handleGameLevel(6)}>Hard</button>
    </div>
  );
}

export default LevelButtons