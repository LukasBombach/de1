import React from "react";
import { Card, Button, Divider } from "antd";
import useNotify from "../../hooks/de1/useNotify";
import useWrite from "../../hooks/de1/useWrite";

interface InfoProps {
  isConnected: boolean;
}

const Info: React.FC<InfoProps> = ({ isConnected }) => {
  const [notifyState, , notifyingState, stateInfos] = useNotify("stateInfo");
  const [loading, setState] = useWrite("state");

  if (isConnected && !notifyingState) notifyState();

  const { state = null, substate = null } = stateInfos.reverse()[0] || {};

  const ready = substate === "ready";
  const heating = substate === "heating";
  const sleeping = state === "sleep";
  const pouring = state === "espresso";

  return (
    <Card>
      <Button
        disabled={!ready || loading}
        onClick={() => setState(!pouring ? "espresso" : "idle")}
      >
        {!pouring ? "Start Espresso" : "Stop Espresso"}
        {!isConnected && " (disconnected)"}
        {sleeping && " (sleeping)"}
        {heating && " (heating)"}
      </Button>

      {/* <Divider />

      <Button
        disabled={!ready || !loading}
        onClick={() => setState("espresso")}
      >
        Start Espresso
      </Button>
      <Button disabled={!ready || !loading} onClick={() => setState("idle")}>
        Set Idle
      </Button> */}
    </Card>
  );
};

export default Info;
