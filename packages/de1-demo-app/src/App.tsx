import React from "react";
import DE1 from "../../de1/src";
import "./App.css";

const de1 = new DE1();

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <button>Hello World</button>
      </header>
    </div>
  );
};

export default App;
