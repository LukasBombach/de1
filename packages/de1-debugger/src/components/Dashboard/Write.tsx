import React, { useState } from "react";
import { Row, Col, Button, Input, Select } from "antd";
import { Converters, Value } from "de1";
import useWrite from "../../hooks/de1/useWrite";
import useConnection from "../../hooks/de1/useConnection";

interface WriteProps<N extends keyof Converters> {
  name: N;
  values?: any[];
}

function Write<N extends keyof Converters>({ name, values }: WriteProps<N>) {
  const [isConnected] = useConnection();
  const [inputValue, setInputValue] = useState("");
  const [loading, writeValue] = useWrite(name);

  return (
    <Row>
      <Col span={6}>
        <Button
          loading={loading}
          disabled={!isConnected}
          onClick={() => writeValue(inputValue as Value<Converters, N>)}
        >
          Write
        </Button>
      </Col>
      <Col span={18}>
        {values ? (
          <ValueSelect
            values={values}
            onChange={setInputValue}
            connected={isConnected}
          />
        ) : (
          <ValueInput
            value={inputValue}
            onChange={setInputValue}
            connected={isConnected}
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
  values?: string[];
  connected?: boolean;
  onChange?: (value: string) => void;
}> = ({ values = [], connected = false, onChange = () => {} }) => {
  return (
    <Select<string>
      style={{ width: "100%" }}
      disabled={!connected}
      onChange={v => onChange(v)}
    >
      {values.map(value => (
        <Select.Option key={value} value={value}>
          {value}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Write;
