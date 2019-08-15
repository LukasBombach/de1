import React from "react";
import { Row, Col } from "antd";
import MachineState from "../components/UserApp/MachineState";
import Temperature from "../components/UserApp/Temperature";
import Espresso from "../components/UserApp/Espresso";

import "./UserApp.css";

const UserApp: React.FC = () => (
  <section>
    <Row gutter={16} style={{ padding: 16 }}>
      <Col xs={24} md={6}>
        <Row>
          <Col>
            <MachineState />
          </Col>
        </Row>
        <Row>
          <Col>
            <Temperature />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={18}>
        <Espresso />
      </Col>
    </Row>
  </section>
);

export default UserApp;
