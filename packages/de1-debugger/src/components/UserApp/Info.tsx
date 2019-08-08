import React from "react";
import { Card } from "antd";
import useNotify from "../../hooks/de1/useNotify";

interface InfoProps {
  isConnected: boolean;
}

const Info: React.FC<InfoProps> = ({ isConnected }) => {
  const [notify, , isNotifiying, stateInfos] = useNotify("stateInfo");
  if (isConnected && !isNotifiying) notify();

  const { state = null, substate = null } = stateInfos.reverse()[0] || {};

  const stateText =
    state === "sleep" ? "sleeping" : substate ? substate : <em>loading...</em>;

  return <Card title="Info">{stateText}</Card>;
};

export default Info;
