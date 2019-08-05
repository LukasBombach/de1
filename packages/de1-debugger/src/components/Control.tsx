import React from "react";
import { Card } from "antd";
import { Converter, Converters } from "de1";
import Read from "./Read";
import Write from "./Write";
import Notify from "./Notify";

interface ControlProps {
  name: keyof Converters;
  converter: Converter<any>;
  connected: boolean;
}

const Control: React.FC<ControlProps> = ({
  name,
  converter,
  connected = false
}) => {
  const { uuid, encode, decode } = converter;
  return (
    <Card title={`${name} ${uuid}`}>
      {decode && <Read name={name} connected={connected} />}
      {encode && <Write name={name} connected={connected} />}
      {decode && <Notify name={name} connected={connected} />}
    </Card>
  );
};

export default Control;
