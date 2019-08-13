import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { green, blue, red } from "@ant-design/colors";
import { Shot } from "de1";
import useNotify from "../../hooks/de1/useNotify";
import de1 from "../../hooks/de1/";
import Chart from "./Chart";

const Espresso: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  const [shot, notifyShot] = useNotify("shot");
  const [shotData, setShotData] = useState<Shot[]>([]);

  if (isConnected) notifyAboutStates();
  if (isConnected) notifyShot();

  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";
  const isReady = stateInfo && stateInfo.substate === "ready";
  const isPouring = stateInfo && stateInfo.state === "espresso";

  useEffect(() => {
    if (shot && isPouring) setShotData(data => data.concat(shot));
  }, [isPouring, shot]);

  return (
    <Card>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button
          onClick={() => de1.startEspresso()}
          disabled={isTurnedOff || !isReady}
        >
          Start Espresso
        </Button>
        <Button
          onClick={() => de1.stopEspresso()}
          disabled={isTurnedOff || !isReady}
        >
          Stop Espresso
        </Button>
      </Button.Group>

      <Chart
        description="Pressure"
        data={shotData}
        dataKey="groupPressure"
        lines={[
          { dataKey: "groupPressure", stroke: green.primary },
          {
            dataKey: "setGroupPressure",
            stroke: green.primary,
            strokeDasharray: "4 2"
          }
        ]}
      />

      <Chart
        description="Flow"
        data={shotData}
        dataKey="groupFlow"
        lines={[
          { dataKey: "groupFlow", stroke: blue.primary },
          {
            dataKey: "setGroupFlow",
            stroke: blue.primary,
            strokeDasharray: "4 2"
          }
        ]}
      />

      <Chart
        description="Temperature"
        data={shotData}
        dataKey="mixTemp"
        unit="°"
        lines={[
          { dataKey: "mixTemp", stroke: red.primary },
          {
            dataKey: "setHeadTemp",
            stroke: red.primary,
            strokeDasharray: "4 2"
          }
        ]}
      />
    </Card>
  );
};

export default Espresso;
