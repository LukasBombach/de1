import React, { useState } from "react";
import { Row, Col, Button, Input, Select } from "antd";
import { Converters, Value } from "de1";
import useWrite from "../hooks/de1/useWrite";

interface WriteProps<N extends keyof Converters> {
  name: N;
  values?: any;
  connected?: boolean;
}

function Write<N extends keyof Converters>({
  name,
  values,
  connected
}: WriteProps<N>) {
  const [inputValue, setInputValue] = useState("");
  const [loading, writeValue] = useWrite(name);

  return (
    <Row>
      <Col span={12}>
        <Button
          loading={loading}
          disabled={!connected}
          onClick={() => writeValue(inputValue as Value<Converters, N>)}
        >
          Write
        </Button>
      </Col>
      <Col span={12}>
        {values ? (
          <ValueSelect
            values={values}
            onChange={setInputValue}
            connected={connected}
          />
        ) : (
          <ValueInput
            value={inputValue}
            onChange={setInputValue}
            connected={connected}
          />
        )}
      </Col>
    </Row>
  );
}

const ValueInput: React.FC<{
  value: string;
  connected?: boolean;
  onChange?: (value: string) => void;
}> = ({ value, connected = false, onChange = () => {} }) => {
  return (
    <Input
      value={value}
      disabled={!connected}
      onChange={e => onChange(e.target.value)}
    />
  );
};

const ValueSelect: React.FC<{
  values?: [string, any][];
  connected?: boolean;
  onChange?: (value: string) => void;
}> = ({ values = [], connected = false, onChange = () => {} }) => {
  return (
    <Select<string>
      style={{ width: "100%" }}
      disabled={!connected}
      onChange={onChange}
    >
      {values.map(([name, value]) => (
        <Select.Option key={name} value={value}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Write;
