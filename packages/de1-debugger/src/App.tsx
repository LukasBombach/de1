import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import Connection from "./components/Connection";
import Control from "./components/Control";
import features from "./features";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ErrorBoundary>
      <Layout>
        <Layout.Content>
          <Row gutter={16}>
            {features
              .filter(f => !f.unused && !f.purposelyDisabled)
              .map(feature => (
                <Col key={feature.feature} xs={24} sm={12} md={6} lg={8} xl={4}>
                  <Control
                    feature={feature.feature}
                    uuid={feature.uuid}
                    read={feature.read}
                    write={feature.write}
                    notify={feature.notify}
                    connected={isConnected}
                    values={feature.values}
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
