import React from "react";
import DE1 from "de1";
import bindings from "sblendid-bindings-macos";
import "./App.css";

DE1.bindings = bindings;

async function de1State() {
  const de1 = await DE1.connect();
  const state = await de1.get("state");
  await de1.disconnect();
  console.log(state);
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
