import React, { useCallback, useEffect, useReducer } from 'react'
import { GameContext } from '../context/gameContext'
import {
	STORAGE_HIGH_SCORE,
	TIME_LIMIT,
	STORAGE_LATEST_GAME,
	initialState
} from '../util/constants'
import { gameReducer } from '../reducers/gameReducer'

export const GameProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

	const { 
		timeLine, 
		highScore, 
		totalTimeRemaining,
		isStarted,
		score,
		moveTime,
		gameOptions,
		backgroundColor,
		gameLevel } = state


	useEffect(() => {
		const storageValue = localStorage.getItem(STORAGE_HIGH_SCORE) ?? '0'
		const latestGameFromStorage = localStorage.getItem(STORAGE_LATEST_GAME)

		if (storageValue === '0')
			localStorage.setItem(STORAGE_HIGH_SCORE, storageValue)

		if (latestGameFromStorage) {
			const json: TimeLine[] = Array.from(JSON.parse(latestGameFromStorage))

			dispatch({ type: 'SET_TIME_LINE', payload: json });
		}
		dispatch({type: 'SET_HIGH_SCORE', payload: parseInt(storageValue) })
	}, [])

	useEffect(() => {
		if (isStarted) {
			dispatch({ type: 'SET_TOTAL_TIME_REMAINING', payload: TIME_LIMIT });
			
			dispatch({ type: 'SET_SCORE', payload: 0 });
			
			dispatch({ type: 'SET_TIME_LINE', payload: [] });
		} else {
			
			dispatch({ type: 'SET_TOTAL_TIME_REMAINING', payload: 0 });

			if (timeLine.length > 0)
				localStorage.setItem(STORAGE_LATEST_GAME, JSON.stringify(timeLine))
		}
	}, [isStarted])

	useEffect(() => {
		let timer: NodeJS.Timer

		if (isStarted) {
			timer = setInterval(() => {
				
				dispatch({ type: 'DECREMENT_TOTAL_TIME_REMAINING' });
			}, 1000)
			if (totalTimeRemaining === 0) dispatch({ type: 'RESET_GAME', payload: 0 });
		}

		return () => clearInterval(timer)
	}, [totalTimeRemaining])

	useEffect(() => {
		if (score > highScore) {
			dispatch({type: 'SET_HIGH_SCORE', payload: score })
			
			localStorage.setItem(STORAGE_HIGH_SCORE, score.toString())
		}
	}, [score])

	const handleScore = (score: number) => {
		dispatch({ type: 'HANDLE_SCORE', payload: score });
		
	}

	const handleStart = (isStarted: boolean) => {
		
		dispatch({ type: 'START_GAME', payload: isStarted });
	}

	const handleReset = () => {
		dispatch({ type: 'END_GAME' })
		
		dispatch({ type: 'SET_TIME_LINE', payload: [] });
		dispatch({ type: 'RESET_GAME', payload: 0 });
		
	}

	const handleResetAllData = () => {
		handleReset()
		localStorage.clear()
		dispatch({type: 'SET_HIGH_SCORE', payload: 0 })
	}

	const handleCalculateScore = useCallback(
		(
			{ correctColor, guessedColor, timeSpent }: GameStatusScore,
			isTimeOut?: boolean
		) => {
			const score = isTimeOut ? -2 : guessedColor === correctColor ? 5 : -1
			handleScore(score)
			dispatch({ type: 'SET_TIME_LINE', payload: [{guessedColor, correctColor, timeSpent}, ...timeLine] });
		},
		[timeLine]
	)

	return (
		<GameContext.Provider
			value={{
				score,
				highScore,
				handleStart,
				handleReset,
				handleResetAllData,
				handleCalculateScore,
				isStarted,
				timeLimit: TIME_LIMIT,
				totalTimeRemaining,
				timeLine,
				moveTime,
				gameOptions,
				backgroundColor,
				gameLevel
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
