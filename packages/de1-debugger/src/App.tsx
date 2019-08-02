import React from "react";
import { Layout, Row, Col } from "antd";
import Connection from "./components/Connection";
import Control from "./components/Control";

const App: React.FC = () => {
  return (
    <Layout>
      <Layout.Content>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={8} xl={4}>
            <Control feature="state" read={true} notify={true} />
          </Col>
        </Row>
        <Connection />
      </Layout.Content>
    </Layout>
  );
};

export default App;
