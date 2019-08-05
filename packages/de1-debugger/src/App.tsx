import React, { useState } from "react";
import { Layout } from "antd";
import { converters, Converters } from "de1";
import ErrorBoundary from "./ErrorBoundary";
import Connection from "./components/Connection";
import Control from "./components/Control";

import "./App.css";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const fullHeight = { height: "100vh" };

  return (
    <ErrorBoundary>
      <Layout style={fullHeight}>
        <Layout.Content style={fullHeight}>
          <section className="app__grid" style={fullHeight}>
            {Object.entries(converters).map(([name, converter]) => (
              <Control
                key={converter.uuid}
                name={name as keyof Converters}
                converter={converter}
                connected={isConnected}
              />
            ))}
          </section>
          <Connection onChange={v => setIsConnected(v)} />
        </Layout.Content>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
