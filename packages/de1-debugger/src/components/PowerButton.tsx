import React from "react";
import { Button } from "antd";
import useNotify from "../hooks/de1/useNotify";
import useWrite from "../hooks/de1/useWrite";

interface PowerButtonProps {
  isConnected: boolean;
}

const PowerButton: React.FC<PowerButtonProps> = ({ isConnected }) => {
  const [notify, , isNotifiying, stateInfos] = useNotify("stateInfo");
  const [writing, setState] = useWrite("state");

  const idleState = "idle";
  const offState = "sleep";
  const stateInfo = stateInfos.reverse()[0] || {};
  const isOn = stateInfo.state !== offState;

  if (isConnected && !isNotifiying) notify();

  const buttonText = !isConnected ? (
    <em>Disconnected</em>
  ) : !stateInfo.state ? (
    <em>Loading</em>
  ) : isOn ? (
    "Turn off"
  ) : (
    "Turn on"
  );

  return (
    <Button
      loading={writing}
      disabled={!isConnected || !stateInfo.state}
      onClick={() => setState(isOn ? offState : idleState)}
    >
      {buttonText}
    </Button>
  );
};

export default PowerButton;
