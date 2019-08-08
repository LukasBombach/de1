import React from "react";
import { Card, Descriptions } from "antd";
import useNotify from "../../hooks/de1/useNotify";

interface InfoProps {
  isConnected: boolean;
}

const Info: React.FC<InfoProps> = ({ isConnected }) => {
  const [notifyState, , notifyingState, stateInfos] = useNotify("stateInfo");
  const [notifyShot, , notifyingShot, shotInfos] = useNotify("shot");

  if (isConnected && !notifyingState) notifyState();
  if (isConnected && !notifyingShot) notifyShot();

  const { state = null, substate = null } = stateInfos.reverse()[0] || {};
  const { mixTemp = null, setMixTemp = null } = shotInfos.reverse()[0] || {};

  const stateText =
    state === "sleep" ? "sleeping" : substate ? substate : <em>loading...</em>;
  const setMixTempText = setMixTemp ? `${setMixTemp}°C` : <em>loading...</em>;
  const mixTempText = mixTemp ? `${mixTemp.toFixed(2)}°C` : <em>loading...</em>;

  return (
    <Card>
      <Descriptions title="Info">
        <Descriptions.Item label="State">{stateText}</Descriptions.Item>
        <Descriptions.Item label="Goal">{setMixTempText}</Descriptions.Item>
        <Descriptions.Item label="Temperature">{mixTempText}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Info;
