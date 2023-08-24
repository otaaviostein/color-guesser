import React, { useContext } from 'react'
import styles from '../styles/Grid/styles.module.scss'
import game from '../styles/GameBoard/styles.module.scss'
import Results from './Results'
import ScoreBoard from './ScoreBoard'
import Game from './Game'
import { GameContext } from '../context/gameContext'

const Grid = () => {
	const { handleResetAllData } = useContext(GameContext)
	const handleClick = () => {
		handleResetAllData()
	}

	return (
		<main className={styles.maingrid}>
			<section className={styles.leftpanel} data-testid="results-section">
				<Results />
			</section>
			<section className={styles.rightpanel}>
				<div className={game.gameboard}>
					<h1>Guess the color</h1>
					<ScoreBoard />
					<Game />
				</div>
				<p className={styles.resetdata} onClick={handleClick}>
					Reset all data
				</p>
			</section>
		</main>
	)
}

export default Grid
