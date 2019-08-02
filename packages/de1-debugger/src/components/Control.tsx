import React from "react";
import { Card } from "antd";

interface ControlProps {
  feature: String;
  connected?: boolean;
  read?: Boolean;
  write?: Boolean;
  notify?: Boolean;
}

const Control: React.FC<ControlProps> = ({
  feature,
  connected,
  read = false,
  write = false,
  notify = false
}) => (
  <Card title={feature}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

export default Control;
