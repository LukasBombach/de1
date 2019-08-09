import React from "react";
import { Row, Col, Card, Descriptions, Button, Statistic } from "antd";
import useNotify from "../hooks/de1/useNotify";
import useEvent from "../hooks/de1/useEvent";
import de1 from "../hooks/de1/";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  const [temperature, listenToTemperature] = useEvent("temperature");
  const [heatingInfo, listenHeating] = useEvent("heating");
  if (isConnected) notifyAboutStates();
  if (isConnected) listenToTemperature();
  if (isConnected) listenHeating();

  const isTurnedOn = !stateInfo || stateInfo.state !== "sleep";
  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";

  return (
    <section>
      <Row>
        <Col>
          <Card>
            <Descriptions title="State">
              <Descriptions.Item label="State">
                {stateInfo ? stateInfo.state : <em>loading…</em>}
              </Descriptions.Item>
              <Descriptions.Item label="SubState">
                {stateInfo ? stateInfo.substate : <em>loading…</em>}
              </Descriptions.Item>
            </Descriptions>
            <Button.Group>
              <Button onClick={() => de1.turnOn()} disabled={isTurnedOn}>
                Turn on
              </Button>
              <Button onClick={() => de1.turnOff()} disabled={isTurnedOff}>
                Turn off
              </Button>
            </Button.Group>
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Temp"
              value={temperature && temperature.temp}
              precision={2}
            />
            <Statistic title="Goal" value={temperature && temperature.goal} />
            <Statistic
              title="Time Elapsed"
              value={heatingInfo && heatingInfo.timeElapsed / 1000}
              precision={2}
              suffix="s"
            />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default UserApp;
