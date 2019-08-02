import React, { useState } from "react";
import { Row, Col, Button, Select, Input } from "antd";
import de1 from "../hooks/de1";

function useWrite(feature: String): [any, (value: any) => Promise<void>] {
  const [loading, setLoading] = useState(false);

  const writeValue = async (value: any) => {
    setLoading(true);
    await de1.set(feature, value);
    setLoading(false);
  };

  return [loading, writeValue];
}

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
        <Button loading={loading} onClick={() => writeValue(value)}>
          Write
        </Button>
      </Col>
      <Col span={12}>
        {values ? (
          <Select<string> style={{ width: "100%" }} onChange={v => setValue(v)}>
            {valuesArray!.map(([name, value]) => (
              <Select.Option key={name} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input value={value} onChange={e => setValue(e.target.value)} />
        )}
      </Col>
    </Row>
  );
};

export default Write;
