export const TIME_LIMIT = 30
export const DEFAULT_MOVE_TIME = 10
export const STORAGE_HIGH_SCORE = 'game-high-score'
export const STORAGE_LATEST_GAME = 'latest-game'

export const initialState: GameStatus = {
	timeLimit: TIME_LIMIT,
	isStarted: false,
	handleStart: () => {},
	handleReset: () => {},
	handleResetAllData: () => {},
	handleCalculateScore: (status: GameStatusScore, isTimeout?: boolean) => {},
	highScore: 0,
	score: 0,
	totalTimeRemaining: 0,
	timeLine: [],
	moveTime: 0,
	gameOptions: [],
	backgroundColor: '',
	gameLevel: 4
};
