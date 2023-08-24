import styles from '../styles/Game/styles.module.scss';

interface ColorButtonsProps {
  gameOptions: GameOptions[];
  handleOption: (guessedColor: string, correctColor: string) => void;
  backgroundColor: string;
}

function ColorButtons({ gameOptions, handleOption, backgroundColor }: ColorButtonsProps) {
  return (
    <div className={styles.gamebuttons}>
      {gameOptions.map(({ color }, i) => (
        <button
          data-testid="color-button"
          key={i + color}
          onClick={() => handleOption(color, backgroundColor)}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

export default ColorButtons