import React from "react";
import { Button } from "antd";
import useRead from "../../hooks/de1/useRead";
import useWrite from "../../hooks/de1/useWrite";

interface PowerButtonProps {
  isConnected: boolean;
}

const PowerButton: React.FC<PowerButtonProps> = ({ isConnected }) => {
  const [stateInfo, reading, readStateInfo] = useRead("stateInfo");
  const [writing, setState] = useWrite("state");

  const idleState = "idle";
  const offState = "sleep";
  const isOn = stateInfo && stateInfo.state !== offState;

  console.log(stateInfo);

  return (
    <Button
      loading={writing}
      onClick={() => setState(isOn ? offState : idleState)}
    >
      Turn {isOn ? "off" : "on"}
    </Button>
  );
};

export default PowerButton;
