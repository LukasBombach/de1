import React from "react";
import { Row, Col, Button } from "antd";
import { Converters } from "de1";
import ReactJson from "react-json-view";
import useNotify from "../../hooks/de1/useNotify";

interface NotifyProps {
  name: keyof Converters;
  connected?: boolean;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

const Notify: React.FC<NotifyProps> = ({ name, connected }) => {
  const [value, start, stop, isNotifiying] = useNotify(name);

  return (
    <Row>
      <Col span={6}>
        <Button disabled={!connected || isNotifiying} onClick={() => start()}>
          Start
        </Button>
        <Button disabled={!connected || !isNotifiying} onClick={() => stop()}>
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
