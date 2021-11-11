import "./Header.scss";

interface HeaderProps {
  className: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={`${className} headerContainer`}>
      <h2>skf-test</h2>
    </header>
  );
};

export default Header;
