import React from "react";
import { Card, Button } from "antd";
import { Converters, Value } from "de1";
import useWrite from "../../hooks/de1/useWrite";

interface ControlProps {
  isConnected?: boolean;
  buttons: ControlButtonProps<keyof Converters>[];
}

export interface ControlButtonProps<N extends keyof Converters> {
  name: N;
  value: Value<Converters, N>;
  label: string;
  isConnected?: boolean;
}

const Control: React.FC<ControlProps> = ({ buttons, isConnected }) => {
  return (
    <Card>
      {buttons.map(button => (
        <ControlButton isConnected={isConnected} {...button} />
      ))}
    </Card>
  );
};

const ControlButton: React.FC<ControlButtonProps<keyof Converters>> = ({
  name,
  value,
  label,
  isConnected = false
}) => {
  const [loading, writeValue] = useWrite(name);

  return (
    <Button onClick={() => writeValue(value)} loading={loading || !isConnected}>
      {label}
    </Button>
  );
};

export default Control;
