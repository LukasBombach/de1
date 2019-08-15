import React from "react";
import { Card } from "antd";
import { Converter, Converters } from "de1";
import ErrorBoundary from "../../ErrorBoundary";
import Read from "./Read";
import Write from "./Write";
import Notify from "./Notify";

interface ControlProps<T> {
  name: keyof Converters;
  converter: Converter<T>;
}

const Control: React.FC<ControlProps<any>> = ({ name, converter }) => {
  const { uuid, encode, decode, values } = converter;
  return (
    <Card title={`${name} ${uuid}`}>
      <ErrorBoundary>
        {decode && <Read name={name} />}
        {encode && <Write name={name} values={values} />}
        {decode && <Notify name={name} />}
      </ErrorBoundary>
    </Card>
  );
};

export default Control;
