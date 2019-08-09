import React, { useState, useEffect } from "react";
import { Row, Col, Card, Descriptions, Button, Statistic, Icon } from "antd";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis
} from "recharts";
import { blue } from "@ant-design/colors";
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
      <Row>
        <Col>
          <MachineState isConnected={isConnected} />
        </Col>
        <Col>
          <Temperature isConnected={isConnected} />
        </Col>
        <Col>
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

const Temperature: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const [temperature, listenToTemperature] = useEvent("temperature");
  const [heatingInfo, listenHeating] = useEvent("heating");
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");

  if (isConnected) notifyAboutStates();
  if (isConnected) listenToTemperature();
  if (isConnected) listenHeating();

  const isHeating = stateInfo && stateInfo.substate === "heating";

  return (
    <Card>
      <Statistic
        title="Temp"
        value={temperature && temperature.temp}
        prefix={isHeating && <Icon type="up-circle" theme="twoTone" />}
        valueStyle={isHeating ? { color: blue.primary } : undefined}
        precision={2}
      />
      <Statistic title="Goal" value={temperature && temperature.goal} />
      <Statistic
        title="Time Elapsed"
        value={heatingInfo && heatingInfo.timeElapsed / 1000}
        precision={2}
        suffix="s"
      />
    </Card>
  );
};

const Espresso: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  const [temperature, listenToTemperature] = useEvent("temperature");
  const [tempData, setTempData] = useState<{ temp: number }[]>([]);

  if (isConnected) notifyAboutStates();
  if (isConnected) listenToTemperature();

  const isTurnedOff = !stateInfo || stateInfo.state === "sleep";

  useEffect(() => {
    if (temperature) setTempData(data => data.concat(temperature).slice(-10));
  }, [temperature]);

  return (
    <Card>
      {Boolean(tempData.length) && (
        <ResponsiveContainer aspect={16 / 9}>
          <LineChart
            data={tempData}
            margin={{ top: 0, right: 0, bottom: 0, left: -30 }}
          >
            <Line type="monotone" dataKey="temp" stroke={blue.primary} />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="temp" unit="°" />
            <XAxis tick={false} />
          </LineChart>
        </ResponsiveContainer>
      )}

      <Button.Group>
        <Button onClick={() => de1.startEspresso()} disabled={isTurnedOff}>
          Start Espresso
        </Button>
        <Button onClick={() => de1.stopEspresso()} disabled={isTurnedOff}>
          Stop Espresso
        </Button>
      </Button.Group>
    </Card>
  );
};

export default UserApp;
