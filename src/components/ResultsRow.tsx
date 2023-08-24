import styles from '../styles/ResultsRow/styles.module.scss';
import contrastChecker from '../util/helpers';

interface ResultsRowProps {
  item: TimeLine;
}

function ResultsRow({ item }: ResultsRowProps) {
  const { correctColor, guessedColor, timeSpent } = item;

  const isCorrect = correctColor === guessedColor;

  const guessedColorStyle = {
    backgroundColor: isCorrect ? correctColor : guessedColor === 'X' ? '' : guessedColor,
    color: contrastChecker(isCorrect ? correctColor : guessedColor),
  };

  const correctColorStyle = {
    backgroundColor: correctColor,
    color: contrastChecker(correctColor),
  };

  return (
    <div className={styles.resultsContent}>
      {isCorrect ? (
        <span className={styles.correct} style={correctColorStyle}>
          {correctColor}
        </span>
      ) : (
        <>
          <span className={styles.incorrect} style={guessedColorStyle}>
            {guessedColor === 'X' ? <span>&#128336;</span> : guessedColor}
          </span>
          <span className={styles.incorrect} style={correctColorStyle}>
            {correctColor}
          </span>
        </>
      )}
      <div className={styles.scoreContainer}>
        <span className={isCorrect ? styles.checked : styles.unchecked}>
          {isCorrect ? <span>&#10004;</span> : <span>&#10006;</span>}
        </span>
        <span>{timeSpent}s</span>
      </div>
    </div>
  );
};

export default ResultsRow;
