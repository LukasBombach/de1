import React from "react";
import { Card } from "antd";
import Read from "./Read";
import Write from "./Write";

interface ControlProps {
  feature: String;
  connected?: boolean;
  read?: Boolean;
  write?: Boolean;
  notify?: Boolean;
  values?: Record<string, any>;
}

const Control: React.FC<ControlProps> = ({
  feature,
  connected = false,
  read = false,
  write = false,
  notify = false,
  values
}) => (
  <Card title={feature}>
    {read && <Read feature={feature} connected={connected} />}
    {write && <Write feature={feature} connected={connected} values={values} />}
  </Card>
);

export default Control;
