import React from "react";
import { Card } from "antd";
import Read from "./Read";

interface ControlProps {
  feature: String;
  connected?: boolean;
  read?: Boolean;
  write?: Boolean;
  notify?: Boolean;
}

const Control: React.FC<ControlProps> = ({
  feature,
  connected = false,
  read = false,
  write = false,
  notify = false
}) => (
  <Card title={feature}>
    {read && <Read feature={feature} connected={connected} />}
  </Card>
);

export default Control;
