const Header = ({ title }) => {
  return (
    <header className="App-header">
      <div className="Title">{title}</div>
      <div className="Creators">A creation by Jai and Ramesh</div>
    </header>
  );
};

Header.defaultProps = {
  title: "Hello World!",
};

export default Header;
