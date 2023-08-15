interface GameStatus {
	isStarted: boolean
	handleStart(isStarted: boolean)
	handleReset()
	handleResetAllData()
	handleCalculateScore(status: GameStatusScore, isTimeOut?: boolean)
	score: number
	highScore: number
	timeLimit: number
	totalTimeRemaining: number
	timeLine: TimeLine[]
}

interface GameStatusScore {
	guessedColor: string
	correctColor: string
	timeSpent: number
}

interface GameOptions {
	color: string
	isCorrect: boolean
}

interface TimeLine {
	guessedColor: string
	correctColor: string
	timeSpent: number
}

type GameLevel = 4 | 5 | 6
