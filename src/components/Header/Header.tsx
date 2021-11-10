import "./Header.scss";

interface HeaderProps {
  className: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div className={`${className} headerContainer`}>
      <h2>skf-test</h2>
    </div>
  );
};

export default Header;
