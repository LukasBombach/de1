import React from "react";
import { Row, Col } from "antd";
import Control, { ControlButtonProps } from "../components/Lab/Control";
import Watch from "../components/Lab/Watch";
import "./Lab.css";

const powerButtons: ControlButtonProps<any>[] = [
  { name: "state", value: "idle", label: "Turn on" },
  { name: "state", value: "sleep", label: "Turn off" }
];

const espressoButtons: ControlButtonProps<any>[] = [
  { name: "state", value: "espresso", label: "Start Espresso" },
  { name: "state", value: "idle", label: "Go Idle" }
];

const UserApp: React.FC = () => {
  return (
    <section>
      <Row>
        <Col span={12}>
          <Row>
            <Watch name="shot" />
          </Row>
          <Row>
            <Watch name="water" />
          </Row>
          <Row>
            <Watch event="heating" />
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Watch name="stateInfo" />
          </Row>
          <Row>
            <Control buttons={powerButtons} />
          </Row>
          <Row>
            <Control buttons={espressoButtons} />
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default UserApp;
