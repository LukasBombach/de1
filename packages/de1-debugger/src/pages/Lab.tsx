import React from "react";
import { Row, Col } from "antd";
import Control, { ControlButtonProps } from "../components/Lab/Control";
import Watch from "../components/Lab/Watch";
import Chart from "../components/Lab/Chart";
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
      <Row>
        <Col span={12}>
          <Row>
            <Watch name="shot" isConnected={isConnected} />
          </Row>
          <Row>
            <Watch name="water" isConnected={isConnected} />
          </Row>
          <Row>
            <Watch event="heating" isConnected={isConnected} />
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Watch name="stateInfo" isConnected={isConnected} />
          </Row>
          <Row>
            <Control buttons={powerButtons} isConnected={isConnected} />
          </Row>
          <Row>
            <Control buttons={espressoButtons} isConnected={isConnected} />
          </Row>
          <Row>
            <Chart
              name="shot"
              valueName="Temperature"
              parseValue={(v: any) => v.mixTemp}
              isConnected={isConnected}
            />
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default UserApp;
