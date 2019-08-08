import React from "react";
import { Card, Button, Divider } from "antd";
import useNotify from "../../hooks/de1/useNotify";
import useWrite from "../../hooks/de1/useWrite";

interface InfoProps {
  isConnected: boolean;
}

const Info: React.FC<InfoProps> = ({ isConnected }) => {
  const [stateInfo, notifyState] = useNotify("stateInfo");
  const [loading, setState] = useWrite("state");

  if (isConnected) notifyState();

  const { state, substate } = stateInfo || { state: null, substate: null };

  const ready = substate === "ready";
  const heating = substate === "heating";
  const sleeping = state === "sleep";
  const pouring = state === "espresso";

  return (
    <Card>
      <Button
        disabled={sleeping || !ready || loading}
        onClick={() => setState(!pouring ? "espresso" : "idle")}
      >
        {!pouring ? "Start Espresso" : "Stop Espresso"}
        {!isConnected && " (disconnected)"}
        {sleeping && " (sleeping)"}
        {heating && " (heating)"}
      </Button>

      <Divider />
      <Button onClick={() => setState("idle")}>Emergency Idle</Button>
    </Card>
  );
};

export default Info;
