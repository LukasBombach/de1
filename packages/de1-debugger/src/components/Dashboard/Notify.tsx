import React from "react";
import { Row, Col, Button, List } from "antd";
import { Converters } from "de1";
import useNotify from "../../hooks/de1/useNotify";

interface NotifyProps {
  name: keyof Converters;
  connected?: boolean;
}

const Notify: React.FC<NotifyProps> = ({ name, connected }) => {
  const [start, stop, isNotifiying, values] = useNotify(name);

  const listStyle = {
    height: 190,
    overflow: "auto"
  };

  if (values.length)
    console.info(
      `%cNotification for ${name}`,
      "color: green;",
      values[values.length - 1]
    );

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
          dataSource={values.reverse()}
          style={listStyle}
          renderItem={value => {
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
