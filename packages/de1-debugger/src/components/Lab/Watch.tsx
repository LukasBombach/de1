import React from "react";
import { Card } from "antd";
import { Converters } from "de1";
import ReactJson from "react-json-view";
import useNotify from "../../hooks/de1/useNotify";

interface WatchProps {
  name: keyof Converters;
  isConnected?: boolean;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

const Watch: React.FC<WatchProps> = ({ name, isConnected }) => {
  const [value, start] = useNotify(name);

  if (isConnected) start();

  return (
    <Card>
      <DataView value={value} />
    </Card>
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

export default Watch;
