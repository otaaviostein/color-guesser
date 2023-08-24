import { act, fireEvent, getAllByTestId, render, screen } from '@testing-library/react';

import Game from '../components/Game'
import { GameProvider } from '../providers/gameProvider';
import React from 'react';

const mockContextValue = {
  isStarted: false,
  handleStart: jest.fn(),
  handleCalculateScore: jest.fn()
};


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));



describe('<Game />', () => {

  beforeEach(() => {
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it('renders start buttons when not started', () => {
    render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    const easyButton = screen.getByText('Easy');
    const mediumButton = screen.getByText('Medium');
    const hardButton = screen.getByText('Hard');

    expect(easyButton).toBeInTheDocument();
    expect(mediumButton).toBeInTheDocument();
    expect(hardButton).toBeInTheDocument();
  });

  it('renders color buttons when started', () => {
    mockContextValue.isStarted = true;
    const { getAllByTestId } = render(<Game />);
    const colorButtons = getAllByTestId('color-button');
    expect(colorButtons.length).toBeGreaterThan(0);
  });

  it('handles game level change', () => {
    mockContextValue.isStarted = false;
    const { getByText } = render(<Game />);
    fireEvent.click(getByText('Easy'));
    expect(mockContextValue.handleStart).toHaveBeenCalledWith(true);
  });

  it('handles color button clicks', () => {
    mockContextValue.isStarted = true;
    const { getAllByTestId } = render(<Game />);
    const colorButton = getAllByTestId('color-button');
    fireEvent.click(colorButton[0]);
    expect(mockContextValue.handleCalculateScore).toHaveBeenCalled();
  });

});
