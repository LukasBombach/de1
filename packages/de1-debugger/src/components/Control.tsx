import React from "react";
import { Card } from "antd";
import Read from "./Read";
import Write from "./Write";
import Notify from "./Notify";

interface ControlProps {
  feature: String;
  uuid: String;
  connected?: boolean;
  read?: Boolean;
  write?: Boolean;
  notify?: Boolean;
  values?: Record<string, any>;
}

const Control: React.FC<ControlProps> = ({
  feature,
  uuid,
  connected = false,
  read = false,
  write = false,
  notify = false,
  values
}) => (
  <Card title={`${feature} ${uuid}`}>
    {read && <Read feature={feature} connected={connected} />}
    {write && <Write feature={feature} connected={connected} values={values} />}
    {notify && <Notify feature={feature} connected={connected} />}
  </Card>
);

export default Control;
