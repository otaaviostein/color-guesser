import React, { useContext, useEffect } from 'react'
import { GameContext } from '../../context/gameContext'
import styles from '../../styles/GameBoard/styles.module.scss'

const ScoreBoard = () => {
	const app = useContext(GameContext)
	const [progressBarSize, setProgressBarSize] = React.useState(100)

	const handleRestart = () => {
		app.handleReset()
	}

	useEffect(() => {
		const remainingTime = Math.floor(
			(100 * app.totalTimeRemaining) / app.timeLimit
		)
		setProgressBarSize(remainingTime)
	}, [app.totalTimeRemaining])

	return (
		<>
			<div className={styles.gamescore}>
				<div className={styles.remaining}>
					<p>Remaining time (s) </p>
					<span
						style={{ color: app.totalTimeRemaining < 10 ? 'red' : 'black' }}
					>
						{app.totalTimeRemaining}
					</span>
				</div>
				<p className={styles.restart} onClick={handleRestart}>
					Restart
				</p>
				<div className={styles.score}>
					<p>High Score</p>
					<span>{app.highScore}</span>
					<p>Score</p>
					<span>{app.score}</span>
				</div>
			</div>
			<div className={styles.progress}>
				<span style={{ width: `${progressBarSize}%` }}></span>
			</div>
		</>
	)
}
export default ScoreBoard
