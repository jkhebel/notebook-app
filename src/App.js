import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">Notable</div>
        <div className="Creators">A creation by Jai and Ramesh</div>
      </header>
      <div className="Main">
        <div className="MainList">Notes</div>
        <div className="MainSelected">Current Note</div>
      </div>
    </div>
  );
}

export default App;
