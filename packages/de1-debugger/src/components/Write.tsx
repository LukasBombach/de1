import React, { useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { Converters, Value } from "de1";
import useWrite from "../hooks/de1/useWrite";

interface WriteProps<N extends keyof Converters> {
  name: N;
  connected?: boolean;
}

function Write<N extends keyof Converters>({ name, connected }: WriteProps<N>) {
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
        <Input
          value={inputValue}
          disabled={!connected}
          onChange={e => setInputValue(e.target.value)}
        />
      </Col>
    </Row>
  );
}

export default Write;

/*
        //const Write: React.FC<WriteProps<N>> = ({ name, connected }) => {

        {values ? (
          <Select<string>
            style={{ width: "100%" }}
            disabled={!connected}
            onChange={v => setValue(v)}
          >
            {valuesArray!.map(([name, value]) => (
              <Select.Option key={name} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        ) : (
*/
