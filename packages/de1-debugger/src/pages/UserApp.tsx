import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Button,
  Statistic,
  Icon,
  Empty
} from "antd";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis
} from "recharts";
import { green, blue, red } from "@ant-design/colors";
import { Shot } from "de1";
import useNotify from "../hooks/de1/useNotify";
import useEvent from "../hooks/de1/useEvent";
import de1 from "../hooks/de1/";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return (
    <section>
      <Row gutter={16} style={{ padding: 16 }}>
        <Col xs={24} md={6}>
          <Row>
            <Col>
              <MachineState isConnected={isConnected} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Temperature isConnected={isConnected} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18}>
          <Espresso isConnected={isConnected} />
        </Col>
      </Row>
    </section>
  );
};

const MachineState: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  if (isConnected) notifyAboutStates();

  const isTurnedOn = !stateInfo || stateInfo.state !== "sleep";
  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";

  return (
    <Card>
      <Descriptions title="State">
        <Descriptions.Item label="State">
          {stateInfo ? stateInfo.state : <em>loading…</em>}
        </Descriptions.Item>
        <Descriptions.Item label="SubState">
          {stateInfo ? stateInfo.substate : <em>loading…</em>}
        </Descriptions.Item>
      </Descriptions>
      <Button.Group>
        <Button onClick={() => de1.turnOn()} disabled={isTurnedOn}>
          Turn on
        </Button>
        <Button onClick={() => de1.turnOff()} disabled={isTurnedOff}>
          Turn off
        </Button>
      </Button.Group>
    </Card>
  );
};

function MMSS(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

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
const Chart: React.FC<{
  data: any[];
  lines: { dataKey: string; strokeDasharray?: string; stroke?: string }[];
  dataKey: string;
  unit?: string;
  description: string;
}> = ({ data = [], description, dataKey, unit, lines }) => {
  return (
    <ResponsiveContainer aspect={6 / 1}>
      {Boolean(data.length) ? (
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: -10 }}
        >
          {lines.map(line => (
            <Line
              key={line.dataKey}
              type="monotone"
              dot={false}
              strokeDasharray={line.strokeDasharray}
              dataKey={line.dataKey}
              stroke={line.stroke || blue.primary}
            />
          ))}

          <CartesianGrid strokeDasharray="2 2" />
          <YAxis dataKey={dataKey} unit={unit} />
          <XAxis tick={false} />
        </LineChart>
      ) : (
        <Empty
          description={description}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            border: "1px dashed #d9d9d9",
            borderRadius: 4,
            padding: 30
          }}
        />
      )}
    </ResponsiveContainer>
  );
};

export default UserApp;
