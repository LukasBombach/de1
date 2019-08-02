import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { states } from "de1";
import ErrorBoundary from "./ErrorBoundary";
import Connection from "./components/Connection";
import Control from "./components/Control";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const controls = [
    {
      feature: "state",
      read: true,
      write: true,
      notify: true,
      values: Object.keys(states)
    },
    {
      feature: "water",
      read: true,
      notify: true
    },
    {
      feature: "versions",
      read: true
    }
  ];

  return (
    <ErrorBoundary>
      <Layout>
        <Layout.Content>
          <Row gutter={16}>
            {controls.map(control => (
              <Col key={control.feature} xs={24} sm={12} md={6} lg={8} xl={4}>
                <Control
                  feature={control.feature}
                  read={control.read}
                  write={control.write}
                  notify={control.notify}
                  connected={isConnected}
                  values={control.values}
                />
              </Col>
            ))}
          </Row>
          <Connection onChange={v => setIsConnected(v)} />
        </Layout.Content>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
