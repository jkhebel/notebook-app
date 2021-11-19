import Header from "./components/Header";

const fs = require('fs')

const dir = '.'
const files = fs.readdirSync(dir)

for (const file of files) {
  console.log(file)
}


function App() {
  return (
    <div className="container">
      <Header title="Notebook"/>
    </div>
  );
}

export default App;
