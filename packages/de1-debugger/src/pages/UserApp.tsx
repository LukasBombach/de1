import React from "react";
import { Row, Col } from "antd";
import MachineState from "../components/UserApp/MachineState";
import Temperature from "../components/UserApp/Temperature";
import Espresso from "../components/UserApp/Espresso";

import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return (
    <section>
      <Row gutter={16} style={{ padding: 16 }}>
        <Col xs={24} md={6}>
          <Row>
            <Col>
              <MachineState isConnected={isConnected} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Temperature isConnected={isConnected} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18}>
          <Espresso isConnected={isConnected} />
        </Col>
      </Row>
    </section>
  );
};

export default UserApp;
