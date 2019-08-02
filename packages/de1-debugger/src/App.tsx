import React from "react";
import { Layout, Row, Col } from "antd";
import Connection from "./components/Connection";
import Control from "./components/Control";
import { states } from "./hooks/de1";

const App: React.FC = () => {
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
              values={Object.keys(states)}
            />
          </Col>
        </Row>
        <Connection />
      </Layout.Content>
    </Layout>
  );
};

export default App;
