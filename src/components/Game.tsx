import React, { useContext, useEffect, useReducer } from 'react'
import { GameContext } from '../context/gameContext'
import styles from '../styles/Game/styles.module.scss'
import { generateOptions } from '../util/helpers'
import { DEFAULT_MOVE_TIME } from '../util/constants'
import LevelButtons from './LevelButtons'
import ColorButtons from './ColorButtons'
import { gameReducer } from '../reducers/gameReducer'
import { initialState } from '../util/initialState'


const Game = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState)
	const { gameLevel, moveTime, gameOptions, backgroundColor } = state
	const {  handleStart, handleCalculateScore, isStarted, totalTimeRemaining } = useContext(GameContext)
	
	const handleGameLevel = (gameLevel: GameLevel = 4) => {
		dispatch({ type: 'SET_GAME_LEVEL', payload: gameLevel })
		handleStart(true)
		dispatch({ type: 'SET_MOVE_TIME', payload: 10 })
	}

	const handleOption = (guessedColor: string, correctColor: string) => {
		handleCalculateScore({
			guessedColor,
			correctColor,
			timeSpent: DEFAULT_MOVE_TIME - moveTime,
		})
		dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) })
		dispatch({ type: 'SET_MOVE_TIME', payload: 10 })
	}

	useEffect(() => {
    if (isStarted) {
      dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) });
    }
  }, [isStarted, gameLevel]);

	useEffect(() => {
    if (isStarted && totalTimeRemaining < 30 && moveTime > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_MOVE_TIME', payload: moveTime - 1 });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [moveTime, totalTimeRemaining, isStarted]);

	useEffect(() => {
		if (gameOptions.length > 0) {
			const correct = gameOptions.filter(({ isCorrect }) => isCorrect)
			dispatch({ type: 'SET_BACKGROUND_COLOR', payload: correct[0].color })
		}
	}, [gameOptions])

	useEffect(() => {
		if (moveTime === 1) {
			handleCalculateScore(
				{ guessedColor: 'X', correctColor: backgroundColor, timeSpent: 10 },
				true
			)
			if (isStarted) {
				dispatch({ type: 'SET_GAME_OPTIONS', payload: generateOptions(gameLevel) })
				dispatch({ type: 'SET_MOVE_TIME', payload: 10 })
			}
		}
	}, [moveTime, isStarted, backgroundColor, gameLevel])

	return (
		<div className={styles.gamecontainer}>
			<div className={styles.gamearea} style={{ backgroundColor }}>
				{!isStarted && <LevelButtons handleGameLevel={handleGameLevel} />}
			</div>
			{isStarted && gameOptions.length > 0 && (
        <ColorButtons
          gameOptions={gameOptions}
          handleOption={handleOption}
          backgroundColor={backgroundColor}
        />
      )}
		</div>
	)
}

export default React.memo(Game)
