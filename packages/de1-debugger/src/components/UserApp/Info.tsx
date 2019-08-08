import React from "react";
import { Card, Descriptions } from "antd";
import { Converters, Value } from "de1";
import useNotify from "../../hooks/de1/useNotify";

interface InfoProps {
  isConnected: boolean;
}

const Info: React.FC<InfoProps> = ({ isConnected }) => {
  const [stateInfo, notifyState] = useNotify("stateInfo");
  const [shotInfo, notifyShot] = useNotify("shot");

  if (isConnected) notifyState();
  if (isConnected) notifyShot();

  return (
    <Card>
      <Descriptions title="Info">
        <Descriptions.Item label="State">
          {getStateText(stateInfo)}
        </Descriptions.Item>
        <Descriptions.Item label="Goal">
          {getGoalTemp(shotInfo)}
        </Descriptions.Item>
        <Descriptions.Item label="Temperature">
          {getTemp(shotInfo)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

function getStateText(
  stateInfo?: Value<Converters, "stateInfo">
): string | JSX.Element {
  if (!stateInfo) return <em>loading...</em>;
  if (stateInfo.state === "sleep") return "sleeping";
  if (stateInfo.substate) return stateInfo.substate;
  return `Unknown States ${JSON.stringify(stateInfo)}`;
}

function getGoalTemp(shot?: Value<Converters, "shot">) {
  if (!shot) return <em>loading...</em>;
  return `${shot.setMixTemp}°C`;
}
function getTemp(shot?: Value<Converters, "shot">) {
  if (!shot) return <em>loading...</em>;
  return `${shot.mixTemp.toFixed(2)}°C`;
}

export default Info;
