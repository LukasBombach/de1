import React from "react";
import DE1 from "de1";
import "./App.css";

async function de1State() {
  const de1 = await DE1.connect();
  console.log("Reading 1", await de1.get("state"));
  console.log("Reading 2", await de1.get("state"));
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => de1State()}>Hello World</button>
      </header>
    </div>
  );
};

export default App;
