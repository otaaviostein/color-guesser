import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Results from './index';

const mockContextValue = {
  timeLine: [
    { correctColor: 'blue', guessedColor: 'blue', timeSpent: 5 },
    { correctColor: 'red', guessedColor: 'green', timeSpent: 8 },
  ],
  isStarted: true,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('Results component', () => {
  beforeEach(() => {
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it('renders results for each game event', () => {
    const { getAllByText } = render(<Results />);
    const guessedColors = getAllByText(/blue|green/);
    const correctColors = getAllByText(/red/);
    const scoreContainers = getAllByText(/s/);
    
    expect(guessedColors.length).toBe(2);
    expect(correctColors.length).toBe(1);
    expect(scoreContainers.length).toBe(3);
  });
});
