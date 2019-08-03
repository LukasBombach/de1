import React from "react";
import { Row, Col, Button, Tag } from "antd";
import useRead from "../hooks/de1/useRead";

interface ReadProps {
  feature: String;
  connected?: boolean;
}

const Read: React.FC<ReadProps> = ({ feature, connected }) => {
  const [value, loading, readValue] = useRead(feature);

  const valueTagStyles = {
    height: "auto",
    minHeight: 32,
    maxHeight: 64,
    overflow: "scroll",
    width: "100%"
  };

  const valueStr =
    typeof value === "object" ? JSON.stringify(value, null, 2) : value;

  if (value)
    console.info(`%cParsed value for ${feature}`, "color: blue;", value);

  return (
    <Row>
      <Col span={12}>
        <Button
          loading={loading}
          disabled={!connected}
          onClick={() => readValue()}
        >
          Read
        </Button>
      </Col>
      <Col span={12}>
        <Tag style={valueTagStyles}>
          <pre>{value && valueStr}</pre>
        </Tag>
      </Col>
    </Row>
  );
};

export default Read;
