import styles from '../styles/ResultsHeader/styles.module.scss'

interface HeaderProps {
  isStarted: boolean;
}

function Header({ isStarted }: HeaderProps) {
  return (
    <h2 className={styles.resultHead}>
      <b>{isStarted ? 'Current' : 'Latest'}</b> game
    </h2>
  );
};

export default Header;
