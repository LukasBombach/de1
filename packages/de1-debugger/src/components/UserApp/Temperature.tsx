import React from "react";
import { Card, Statistic, Icon } from "antd";
import { blue } from "@ant-design/colors";
import useNotify from "../../hooks/de1/useNotify";
import useEvent from "../../hooks/de1/useEvent";

const Temperature: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const [heatingInfo, listenHeating] = useEvent("heating");
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");

  if (isConnected) notifyAboutStates();
  if (isConnected) listenHeating();

  const isHeating = stateInfo && stateInfo.substate === "heating";

  return (
    <Card>
      <Statistic
        title="Temp"
        value={heatingInfo && heatingInfo.temp}
        prefix={isHeating && <Icon type="up-circle" theme="twoTone" />}
        valueStyle={isHeating ? { color: blue.primary } : undefined}
        precision={2}
      />
      <Statistic title="Goal" value={heatingInfo && heatingInfo.goal} />
      <Statistic
        title="Time Elapsed"
        value={heatingInfo && MMSS(heatingInfo.timeElapsed)}
        precision={2}
        suffix="m"
      />
      <Statistic
        title="Time Left"
        value={heatingInfo && MMSS(heatingInfo.experimentalTimeRemaining || 0)}
        precision={2}
        suffix="m"
      />
    </Card>
  );
};

function MMSS(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Temperature;
