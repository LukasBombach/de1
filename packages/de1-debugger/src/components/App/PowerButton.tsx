import React from "react";
import { Button } from "antd";
import { Converters, Value } from "de1";
import useConnection from "../../hooks/useConnection";
import useNotify from "../../hooks/useNotify";
import useWrite from "../../hooks/useWrite";

const PowerButton: React.FC = () => {
  const isConnected = useConnection();
  const [stateInfo] = useNotify("stateInfo");
  const [writing, setState] = useWrite("state");

  const idleState = "idle";
  const offState = "sleep";
  const isOn = stateInfo && stateInfo.state !== offState;

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
