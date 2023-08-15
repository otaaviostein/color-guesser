import React, { useContext } from 'react'
import { GameContext } from '../../context/gameContext'
import styles from '../../styles/Results/styles.module.scss'
import contrastChecker from '../../util/helpers'

const Results = () => {
	const { timeLine, isStarted } = useContext(GameContext)
	
	return (
		<div className={styles.results}>
			<h2><b>{isStarted ? 'Current' : 'Latest'}</b> game</h2>
			<div className={styles.resultsgridcontent}>
				<div className={styles.resultsHeader}>
					<p>Guessed color</p>
					<p>Correct color</p>
					<p>Score</p>
				</div>
				{timeLine.length > 0 &&
					timeLine.map(({ correctColor, guessedColor, timeSpent }, i) => {
						return correctColor === guessedColor ? (
							<div className={styles.resultsContent} key={i}>
								<span
									className={styles.correct}
									style={{
										backgroundColor: correctColor,
										color: contrastChecker(correctColor),
									}}
								>
									{correctColor}
								</span>
								<div className={styles.scoreContainer}>
									<span className={styles.checked}>&#10004;</span> 
									<span>{timeSpent}s</span>
								</div>
							</div>
						) : (
							<div className={styles.resultsContent} key={i}>
								<span
									className={styles.incorrect}
									style={{
										backgroundColor: guessedColor === 'X' ? '' : guessedColor,
										color: contrastChecker(correctColor),
									}}
								>
									{guessedColor === 'X' ? (
										<span>&#128336;</span>
									) : (
										guessedColor
									)}
								</span>
								<span
									className={styles.incorrect}
									style={{
										backgroundColor: correctColor,
										color: contrastChecker(correctColor),
									}}
								>
									{correctColor}
								</span>
								<div className={styles.scoreContainer}>
									<span className={styles.unchecked}>&#10006;</span> 
									<span>{timeSpent}s</span>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default React.memo(Results)
