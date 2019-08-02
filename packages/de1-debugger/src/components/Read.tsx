import React, { useState } from "react";
import { Row, Col, Button, Tag } from "antd";
import useRead from "../hooks/de1/useRead";

interface ReadProps {
  feature: String;
  connected?: boolean;
}

const valueTagStyles = {
  marginTop: 7,
  height: 22,
  minWidth: 70
};

const Read: React.FC<ReadProps> = ({ feature, connected }) => {
  const [value, loading, readValue] = useRead(feature);

  return (
    <Row>
      <Col span={12}>
        <Button loading={loading} onClick={() => readValue()}>
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
