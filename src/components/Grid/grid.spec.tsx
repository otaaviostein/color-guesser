import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Grid from './index';

const mockContextValue = {
  timeLimit: 30,
  isStarted: false,
  handleStart: jest.fn(),
  handleReset: jest.fn(),
  handleResetAllData: jest.fn(),
  handleCalculateScore: jest.fn(),
  highScore: 0,
  score: 0,
  totalTimeRemaining: 0,
  timeLine: [],
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('Grid component', () => {
  beforeEach(() => {
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it('renders main grid elements', () => {
    const { getAllByText, getByTestId } = render(<Grid />);
    
    const resultsSection = getByTestId('results-section');
    const scoreBoard = getAllByText('Score');
    const gameTitle = getAllByText('Guess the color');
    
    expect(resultsSection).toBeInTheDocument();
    expect(scoreBoard[0]).toBeInTheDocument();
    expect(gameTitle[0]).toBeInTheDocument();
  });

  it('triggers handleResetAllData when reset data link is clicked', () => {
    const { getAllByText } = render(<Grid />);
    const resetLink = getAllByText('Reset all data');
    
    fireEvent.click(resetLink[0]);
    
    expect(mockContextValue.handleResetAllData).toHaveBeenCalled();
  });
});
