import React from "react";
import { Button } from "antd";
import { Converters, Value } from "de1";
import useNotify from "../hooks/de1/useNotify";
import useWrite from "../hooks/de1/useWrite";

interface PowerButtonProps {
  isConnected: boolean;
}

const PowerButton: React.FC<PowerButtonProps> = ({ isConnected }) => {
  const [stateInfo, notify] = useNotify("stateInfo");
  const [writing, setState] = useWrite("state");

  const idleState = "idle";
  const offState = "sleep";
  const isOn = stateInfo && stateInfo.state !== offState;

  if (isConnected) notify();

  return (
    <Button
      loading={writing}
      disabled={!isConnected || !stateInfo}
      onClick={() => setState(isOn ? offState : idleState)}
    >
      {getButtonText(isConnected, stateInfo)}
    </Button>
  );
};

function getButtonText(
  isConnected: boolean,
  stateInfo?: Value<Converters, "stateInfo">
) {
  if (!isConnected) return <em>Disconnected</em>;
  if (!stateInfo) return <em>Loading</em>;
  if (stateInfo.state === "sleep") return "Turn on";
  return "Turn off";
}

export default PowerButton;
