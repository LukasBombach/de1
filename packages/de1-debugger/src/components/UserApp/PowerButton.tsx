import React from "react";
import { Button } from "antd";
import useNotify from "../../hooks/de1/useNotify";
import useWrite from "../../hooks/de1/useWrite";

interface PowerButtonProps {
  isConnected: boolean;
}

const PowerButton: React.FC<PowerButtonProps> = ({ isConnected }) => {
  const [start, stop, isNotifiying, stateInfos] = useNotify("stateInfo");
  const [writing, setState] = useWrite("state");

  const idleState = "idle";
  const offState = "sleep";
  const stateInfo = stateInfos.reverse()[0] || {};
  const isOn = stateInfo.state !== offState;

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
