import React from "react";
import { Row, Col, Button } from "antd";
import { Converters } from "de1";
import ReactJson from "react-json-view";
import useConnection from "../../hooks/de1/useConnection";
import useRead from "../../hooks/de1/useRead";

interface ReadProps {
  name: keyof Converters;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

const Read: React.FC<ReadProps> = ({ name }) => {
  const isConnected = useConnection();
  const [value, loading, readValue] = useRead(name);

  if (value) console.info(`%cParsed value for ${name}`, "color: blue;", value);

  return (
    <Row>
      <Col span={6}>
        <Button
          loading={loading}
          disabled={!isConnected}
          onClick={() => readValue()}
        >
          Read
        </Button>
      </Col>
      <Col span={18}>
        <div
          className="ant-input"
          style={{
            width: "100%",
            height: "auto",
            minHeight: 32,
            maxHeight: 200,
            overflow: "scroll",
            lineHeight: 1.2
          }}
        >
          <DataView value={value} />
        </div>
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

export default Read;
