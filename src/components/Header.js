const Header = ({ title }) => {
  return (
    <header className="AppHeader">
      <div className="Title">Notable</div>
      <div className="Creators">A creation by Jai and Ramesh</div>
    </header>
  );
};

Header.defaultProps = {
  title: "Hello World!",
};

export default Header;
