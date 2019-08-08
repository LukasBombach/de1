import React from "react";
import { Row, Col, Button, List } from "antd";
import { Converters } from "de1";
import useNotify from "../../hooks/de1/useNotify";

interface NotifyProps {
  name: keyof Converters;
  connected?: boolean;
}

const Notify: React.FC<NotifyProps> = ({ name, connected }) => {
  const [value, start, stop, isNotifiying] = useNotify(name);

  const listStyle = {
    height: 190,
    overflow: "auto"
  };

  // if (value) console.info(`%cNotification for ${name}`, "color: green;", value);

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
          dataSource={[value]}
          style={listStyle}
          renderItem={(value: any) => {
            value =
              typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : value;
            return <List.Item>{value}</List.Item>;
          }}
        />
      </Col>
    </Row>
  );
};

export default Notify;
