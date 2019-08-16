import React from "react";
import { Card, Descriptions, Button } from "antd";
import useNotify from "../../hooks/useNotify";
import de1 from "../../lib/de1";

const { Item } = Descriptions;

const MachineState: React.FC = () => {
  const stateInfo = useNotify("stateInfo");

  const isTurnedOn = !stateInfo || stateInfo.state !== "sleep";
  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";

  const state = stateInfo ? stateInfo.state : <em>loading…</em>;
  const substate = stateInfo ? stateInfo.substate : <em>loading…</em>;

  return (
    <Card>
      <Descriptions title="Machine State" layout="vertical">
        <Item label="State">{state}</Item>
        <Item label="SubState">{substate}</Item>
      </Descriptions>
      <Button.Group>
        <Button onClick={de1.turnOn} disabled={isTurnedOn}>
          Turn on
        </Button>
        <Button onClick={de1.turnOff} disabled={isTurnedOff}>
          Turn off
        </Button>
      </Button.Group>
    </Card>
  );
};

export default MachineState;
