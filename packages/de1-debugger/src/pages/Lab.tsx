import React from "react";
import { Row, Col } from "antd";
import Watch from "../components/Lab/Watch";
import Control, { ControlButtonProps } from "../components/Lab/Control";
import "./Lab.css";

interface UserAppProps {
  isConnected: boolean;
}

const powerButtons: ControlButtonProps<any>[] = [
  { name: "state", value: "idle", label: "Turn on" },
  { name: "state", value: "sleep", label: "Turn off" }
];

const espressoButtons: ControlButtonProps<any>[] = [
  { name: "state", value: "espresso", label: "Start Espresso" },
  { name: "state", value: "idle", label: "Go Idle" }
];

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return (
    <section>
      <Row gutter={16}>
        <Col span={6}>
          <Row gutter={16}>
            <Watch name="shot" isConnected={isConnected} />
          </Row>
          <Row gutter={16}>
            <Watch name="water" isConnected={isConnected} />
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Watch name="stateInfo" isConnected={isConnected} />
          </Row>
          <Row gutter={16}>
            <Control buttons={powerButtons} isConnected={isConnected} />
          </Row>
          <Row gutter={16}>
            <Control buttons={espressoButtons} isConnected={isConnected} />
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default UserApp;
