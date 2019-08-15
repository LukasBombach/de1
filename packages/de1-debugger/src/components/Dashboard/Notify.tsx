import React from "react";
import { Row, Col, Button } from "antd";
import { Converters } from "de1";
import ReactJson from "react-json-view";
import useNotify from "../../hooks/de1/useNotify";
import useConnection from "../../hooks/de1/useConnection";

interface NotifyProps {
  name: keyof Converters;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

const Notify: React.FC<NotifyProps> = ({ name }) => {
  const [isConnected] = useConnection();
  const [value, start, stop, isNotifiying] = useNotify(name);

  return (
    <Row>
      <Col span={6}>
        <Button disabled={!isConnected || isNotifiying} onClick={() => start()}>
          Start
        </Button>
        <Button disabled={!isConnected || !isNotifiying} onClick={() => stop()}>
          Stop
        </Button>
      </Col>
      <Col span={18}>
        <DataView value={value} />
      </Col>
    </Row>
  );
};

const DataView: React.FC<DataViewProps> = ({ name, value }) => {
  if (typeof value === "object")
    return (
      <ReactJson
        name={name}
        src={value}
        collapsed={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        style={{ fontSize: 12, width: 300, minHeight: 32 }}
      />
    );
  return <span>{JSON.stringify(value)}</span>;
};

export default Notify;
