import React from "react";
import { Card, Button } from "antd";
import { Converters, Value } from "de1";
import useConnection from "../../hooks/de1/useConnection";
import useWrite from "../../hooks/de1/useWrite";

interface ControlProps {
  buttons: ControlButtonProps<keyof Converters>[];
}

export interface ControlButtonProps<N extends keyof Converters> {
  name: N;
  value: Value<Converters, N>;
  label: string;
}

const Control: React.FC<ControlProps> = ({ buttons }) => {
  return (
    <Card>
      {buttons.map((button, key) => (
        <ControlButton key={key} {...button} />
      ))}
    </Card>
  );
};

const ControlButton: React.FC<ControlButtonProps<keyof Converters>> = ({
  name,
  value,
  label
}) => {
  const [isConnected] = useConnection();
  const [loading, writeValue] = useWrite(name);

  return (
    <Button onClick={() => writeValue(value)} loading={loading || !isConnected}>
      {label}
    </Button>
  );
};

export default Control;
