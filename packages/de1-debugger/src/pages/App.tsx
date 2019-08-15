import React from "react";
import { Row, Col } from "antd";
import MachineState from "../components/App/MachineState";
import Temperature from "../components/App/Temperature";
import Espresso from "../components/App/Espresso";

import "./App.css";

const UserApp: React.FC = () => (
  <section>
    <Row gutter={16} style={{ padding: 16 }}>
      <Col xs={24} md={6}>
        <MachineState />
        <Temperature />
      </Col>
      <Col xs={24} md={18}>
        <Espresso />
      </Col>
    </Row>
  </section>
);

export default UserApp;
