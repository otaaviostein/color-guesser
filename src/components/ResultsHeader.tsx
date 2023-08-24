interface HeaderProps {
  isStarted: boolean;
}

function Header({ isStarted }: HeaderProps) {
  return (
    <h2>
      <b>{isStarted ? 'Current' : 'Latest'}</b> game
    </h2>
  );
};

export default Header;
