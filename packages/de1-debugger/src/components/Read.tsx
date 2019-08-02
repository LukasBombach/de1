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
    height: 32,
    width: "100%",
    padding: "4px 11px"
  };

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
        <Tag style={valueTagStyles}>{value}</Tag>
      </Col>
    </Row>
  );
};

export default Read;
