import React from "react";
import useNotify from "../hooks/de1/useNotify";
import de1 from "../hooks/de1/";
import { Row, Col, Card, Descriptions, Button } from "antd";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  if (isConnected) notifyAboutStates();

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
      </Row>
    </section>
  );
};

export default UserApp;
