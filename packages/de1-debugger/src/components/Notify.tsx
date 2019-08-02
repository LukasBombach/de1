import React, { useState } from "react";
import { Row, Col, Button, List } from "antd";
import useNotify from "../hooks/de1/useNotify";

interface NotifyProps {
  feature: String;
  connected?: boolean;
}

const Notify: React.FC<NotifyProps> = ({ feature, connected }) => {
  const [start, stop, isNotifiying, values] = useNotify(feature);

  const listStyle = {
    height: 77,
    overflow: "scroll"
  };

  return (
    <Row>
      <Col span={12}>
        <Button disabled={!connected || isNotifiying} onClick={() => start()}>
          Start
        </Button>
        <Button disabled={!connected || !isNotifiying} onClick={() => stop()}>
          Stop
        </Button>
      </Col>
      <Col span={12}>
        <List
          size="small"
          bordered
          dataSource={values}
          style={listStyle}
          renderItem={v => <List.Item>{v}</List.Item>}
        />
      </Col>
    </Row>
  );
};

export default Notify;
