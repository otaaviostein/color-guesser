import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScoreBoard from '../components/ScoreBoard';

const mockContextValue = {
  timeLimit: 30,
  isStarted: true,
  handleReset: jest.fn(),
  highScore: 100,
  score: 50,
  totalTimeRemaining: 30,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('ScoreBoard component', () => {
  beforeEach(() => {
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it('renders score information correctly', () => {
    const { getByText } = render(<ScoreBoard />);
    
    const highScore = getByText('High Score');
    const score = getByText('Score');
    const highScoreValue = getByText('100');
    const scoreValue = getByText('50');
    
    expect(highScore).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(highScoreValue).toBeInTheDocument();
    expect(scoreValue).toBeInTheDocument();
  });

  it('renders remaining time correctly', () => {
    const { getByText } = render(<ScoreBoard />);
    const remainingTime = getByText('Remaining time');
    const timeValue = getByText('30');
    
    expect(remainingTime).toBeInTheDocument();
    expect(timeValue).toHaveStyle('color: black');
  });

  it('triggers handleReset when restart link is clicked', () => {
    const { getByText } = render(<ScoreBoard />);
    const restartLink = getByText('Restart');
    
    fireEvent.click(restartLink);
    
    expect(mockContextValue.handleReset).toHaveBeenCalled();
  });
});
