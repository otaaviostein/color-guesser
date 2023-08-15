import React, { useContext, useEffect } from 'react'
import { GameContext } from '../../context/gameContext'
import styles from '../../styles/Game/styles.module.scss'
import { generateOptions } from '../../util/helpers'
import { DEFAULT_MOVE_TIME } from '../../util/constants'

const Game = () => {
	const [moveTime, setMoveTime] = React.useState(DEFAULT_MOVE_TIME)
	const [gameOptions, setGameOptions] = React.useState<GameOptions[]>([])
	const [backgroundColor, setBackgroundColor] = React.useState('')
	const [gameLevel, setGameLevel] = React.useState<GameLevel>(4)
	const app = useContext(GameContext)

	const handleStart = () => {
		app.handleStart(true)
	}

	const handleGameLevel = (gameLevel: GameLevel = 4) => {
		setGameLevel(gameLevel)
		handleStart()
	}

	const handleOption = (guessedColor: string, correctColor: string) => {
		app.handleCalculateScore({
			guessedColor,
			correctColor,
			timeSpent: DEFAULT_MOVE_TIME - moveTime,
		})
		setGameOptions(generateOptions(gameLevel))
		setMoveTime(10)
	}

	useEffect(() => {
		if (app.isStarted) {
			setGameOptions(generateOptions(gameLevel))
		}
	}, [app.isStarted])

	useEffect(() => {
		if (app.isStarted && app.totalTimeRemaining < 30) setMoveTime(moveTime - 1)
	}, [app.totalTimeRemaining])

	useEffect(() => {
		if (gameOptions.length > 0) {
			const correct = gameOptions.filter(({ isCorrect }) => isCorrect)
			setBackgroundColor(correct[0].color)
		}
	}, [gameOptions])

	useEffect(() => {
		if (moveTime === 0) {
			app.handleCalculateScore(
				{ guessedColor: 'X', correctColor: backgroundColor, timeSpent: 10 },
				true
			)
			if (app.isStarted) {
				setGameOptions(generateOptions(gameLevel))
				setMoveTime(10)
			}
		}
	}, [moveTime])

	return (
		<div className={styles.gamecontainer}>
			<div className={styles.gamearea} style={{ backgroundColor }}>
				{!app.isStarted && (
					<div data-testid="game-buttons">
						<button onClick={() => handleGameLevel(4)}>
							Easy
						</button>
						<button onClick={() => handleGameLevel(5)}>
							Medium
						</button>
						<button onClick={() => handleGameLevel(6)}>
							Hard
						</button>
					</div>
				)}
			</div>
			{app.isStarted && gameOptions.length > 0 && (
				<div className={styles.gamebuttons}>
					{gameOptions.map(({ color }, i) => (
						<button
							data-testid="color-button"
							key={i + color}
							onClick={() => handleOption(color, backgroundColor)}
						>
							{color}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default React.memo(Game)
