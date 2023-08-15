import React, { useContext, useEffect, useReducer } from 'react'
import { GameContext } from '../../context/gameContext'
import styles from '../../styles/Game/styles.module.scss'
import { generateOptions } from '../../util/helpers'
import { DEFAULT_MOVE_TIME, initialState } from '../../util/constants'
import { gameReducer } from '../../reducers/gameReducer'

const Game = () => {

	const [state, dispatch] = useReducer(gameReducer, initialState)
	const app = useContext(GameContext)

	const { moveTime, gameOptions, backgroundColor, gameLevel } = state

	const handleStart = () => {
		app.handleStart(true)
	}

	const handleGameLevel = (gameLevel: GameLevel = 4) => {
		dispatch({ type: 'SET_GAME_LEVEL', payload: gameLevel })
		handleStart()
	}

	const handleOption = (guessedColor: string, correctColor: string) => {
		app.handleCalculateScore({
			guessedColor,
			correctColor,
			timeSpent: DEFAULT_MOVE_TIME - moveTime,
		})
		
		dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) })
		
		dispatch({ type: 'SET_MOVE_TIME', payload: 10 })
	}

	useEffect(() => {
		if (app.isStarted) {
			dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) })
		}
	}, [app.isStarted])

	useEffect(() => {
		if (app.isStarted && app.totalTimeRemaining < 30) dispatch({ type: 'SET_MOVE_TIME', payload: moveTime - 1 })
		
	}, [app.totalTimeRemaining])

	useEffect(() => {
		if (gameOptions.length > 0) {
			const correct = gameOptions.filter(({ isCorrect }: GameOptions) => isCorrect)
			dispatch({ type: 'SET_BACKGROUND_COLOR', payload: correct[0].color })
		}
	}, [gameOptions])

	useEffect(() => {
		if (moveTime === 0) {
			app.handleCalculateScore(
				{ guessedColor: 'X', correctColor: backgroundColor, timeSpent: 10 },
				true
			)
			if (app.isStarted) {
				dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) })
				dispatch({ type: 'SET_MOVE_TIME', payload: 10 })
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
					{gameOptions.map(({ color }: GameOptions, i: number) => (
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
