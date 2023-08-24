import { TIME_LIMIT } from "./constants";

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
	backgroundColor: ''
};
