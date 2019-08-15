import fs from "fs";
import React, { useState, useEffect } from "react";
import { Card, Statistic, Descriptions, Icon } from "antd";
import { blue } from "@ant-design/colors";
import useNotify from "../../hooks/useNotify";
import useEvent from "../../hooks/useEvent";
import { Shot } from "de1/lib/src";

const Temperature: React.FC = () => {
  const [heatingInfo] = useEvent("heating");
  const [stateInfo] = useNotify("stateInfo");
  const [estimatedDeadline, setEstimatedDeadline] = useState(0);
  const [estimatedMiss, setEstimatedMiss] = useState(0);
  const [avg] = useHeatLogs();

  const isHeating = stateInfo && stateInfo.substate === "heating";
  const estimatedTimeLeft =
    heatingInfo && avg ? (heatingInfo.tempRemaining / avg) * 1000 : 0;

  if (heatingInfo && avg && estimatedDeadline === 0) {
    setEstimatedDeadline(Date.now() + (heatingInfo.tempRemaining / avg) * 1000);
  }

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
      <Statistic
        title="Estimated Time Left"
        value={MMSS(estimatedTimeLeft)}
        precision={2}
        suffix="m"
      />
      <Statistic.Countdown
        title="Estimated Time Left Once"
        value={estimatedDeadline}
        format="HH:mm:ss:SSS"
        onFinish={() => setEstimatedMiss(Date.now() - estimatedDeadline)}
      />
      <Descriptions>
        <Descriptions.Item label="Missed by">
          {MMSS(estimatedMiss)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

function MMSS(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function useHeatLogs() {
  const [avg, setAvg] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (avg) return;
    readHeatLogs().then(files => setAvg(files));
  }, [avg]);

  return [avg];
}

async function readHeatLogs() {
  const projectDir = "/Users/lbombach/Projekte/DecentEspresso/de1";
  const relativeDir = "packages/de1/src/development/heatingLogs";
  const absoluteDir = `${projectDir}/${relativeDir}`;

  const files: any[] = await fs.promises.readdir(absoluteDir);

  for (const i in files) {
    const filePath = `${absoluteDir}/${files[i]}`;
    const contents = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(contents) as Shot[];
    const firstItem = data[0];
    const lastItem = data[data.length - 1];
    const time = lastItem.time - firstItem.time;
    const temp = lastItem.mixTemp - firstItem.mixTemp;
    const tempPerSecond = temp / (time / 1000);
    const timeMMSS = MMSS(time);
    files[i] = { timeMMSS, tempPerSecond, temp, time };
  }

  const filesAboveTimeLimit = files.filter(f => f.time > 60 * 1000);
  const averageTime =
    filesAboveTimeLimit.map(f => f.time).reduce((p, c) => p + c, 0) /
    filesAboveTimeLimit.length;
  const averageTemp =
    filesAboveTimeLimit.map(f => f.temp).reduce((p, c) => p + c, 0) /
    filesAboveTimeLimit.length;

  const averateTempPerSecond = averageTemp / (averageTime / 1000);
  const averateTimeMMSS = MMSS(averageTime);

  console.log(
    `${averateTimeMMSS} / ${averageTemp.toFixed(2)}`,
    Math.round(averateTempPerSecond * 100) / 100,
    "samples:",
    `(${filesAboveTimeLimit.length}/${files.length})`
  );

  return averateTempPerSecond;
}

export default Temperature;
