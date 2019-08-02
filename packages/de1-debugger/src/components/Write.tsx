import React, { useState } from "react";
import { Row, Col, Button, Select, Input } from "antd";
import useWrite from "../hooks/de1/useWrite";

interface WriteProps {
  feature: String;
  connected?: boolean;
  values?: Record<string, any> | any[];
}

const Write: React.FC<WriteProps> = ({ feature, values, connected }) => {
  const [value, setValue] = useState("");
  const [loading, writeValue] = useWrite(feature);

  const valuesArray = !values
    ? undefined
    : Array.isArray(values)
    ? values.map(v => [v, v])
    : Object.entries(values);

  return (
    <Row>
      <Col span={12}>
        <Button
          loading={loading}
          disabled={!connected}
          onClick={() => writeValue(value)}
        >
          Write
        </Button>
      </Col>
      <Col span={12}>
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
          <Input
            value={value}
            disabled={!connected}
            onChange={e => setValue(e.target.value)}
          />
        )}
      </Col>
    </Row>
  );
};

export default Write;
