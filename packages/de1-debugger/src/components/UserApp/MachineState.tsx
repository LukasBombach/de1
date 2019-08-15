import React from "react";
import de1 from "../../hooks/de1/";
import { Card, Descriptions, Button } from "antd";
import useNotify from "../../hooks/de1/useNotify";

const MachineState: React.FC = () => {
  const [stateInfo] = useNotify("stateInfo");

  const isTurnedOn = !stateInfo || stateInfo.state !== "sleep";
  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";

  return (
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
  );
};

export default MachineState;
