import React, { useState } from "react";
import { Layout } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import Connection from "./components/Connection";
import Control from "./components/Control";
import features from "./features";
import "./App.css";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const fullHeight = { height: "100vh" };

  return (
    <ErrorBoundary>
      <Layout style={fullHeight}>
        <Layout.Content style={fullHeight}>
          <section className="app__grid" style={fullHeight}>
            {features
              .filter(f => !f.unused && !f.purposelyDisabled)
              .map(feature => (
                <Control
                  key={feature.feature}
                  feature={feature.feature}
                  uuid={feature.uuid}
                  read={feature.read}
                  write={feature.write}
                  notify={feature.notify}
                  connected={isConnected}
                  values={feature.values}
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
