type Action =
  | { type: 'SET_HIGH_SCORE'; payload: number }
  | { type: 'SET_TOTAL_TIME_REMAINING'; payload: number }
  | { type: 'DECREMENT_TOTAL_TIME_REMAINING' }
  | { type: 'END_GAME' }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'RESET_GAME'; payload: number }
  | { type: 'START_GAME'; payload: boolean }
  | { type: 'SET_GAME_LEVEL'; payload: GameLevel }
  | { type: 'SET_TIME_LINE'; payload: TimeLine[] }
  | { type: 'HANDLE_SCORE'; payload: number };

export const gameReducer = (state: GameStatus, action: Action): GameStatus => {
  switch (action.type) {
    case 'SET_SCORE':
      return { ...state, score: action.payload }
    
    case 'SET_HIGH_SCORE':
      return { ...state, highScore: action.payload }
    case 'SET_TIME_LINE':
      return { ...state, timeLine: action.payload }
    case 'SET_TOTAL_TIME_REMAINING':
      return { ...state, totalTimeRemaining: action.payload }
    case 'DECREMENT_TOTAL_TIME_REMAINING':
      return {
        ...state,
        totalTimeRemaining: state.totalTimeRemaining - 1 < 0 ? 0 : state.totalTimeRemaining - 1,
      }
    case 'END_GAME':
      return { ...state, isStarted: false };
    case 'START_GAME':
      return { ...state, isStarted: action.payload }
    case 'HANDLE_SCORE':
      return { ...state, score: state.score + action.payload }
    case 'RESET_GAME':
      return {
        ...state,
        isStarted: false,
        score: 0,
        totalTimeRemaining: 0,
      }
    default:
      return state
  }
};