import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import Connection from "./components/Connection";
import Control from "./components/Control";
import { states } from "./hooks/de1";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Layout>
      <Layout.Content>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={8} xl={4}>
            <Control
              feature="state"
              read={true}
              write={true}
              notify={true}
              connected={isConnected}
              values={Object.keys(states)}
            />
          </Col>
        </Row>
        <Connection onChange={v => setIsConnected(v)} />
      </Layout.Content>
    </Layout>
  );
};

export default App;
