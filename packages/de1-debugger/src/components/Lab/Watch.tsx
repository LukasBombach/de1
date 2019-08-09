import React from "react";
import { Card } from "antd";
import { Converters, De1Events } from "de1";
import ReactJson from "react-json-view";
import useNotify from "../../hooks/de1/useNotify";
import useEvent from "../../hooks/de1/useEvent";

interface WatchProps {
  name?: keyof Converters;
  event?: keyof De1Events;
  isConnected?: boolean;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

interface NameOrEventParams {
  name?: keyof Converters;
  event?: keyof De1Events;
}

const Watch: React.FC<WatchProps> = ({ name, event, isConnected }) => {
  if (name) return <WatchName name={name} isConnected={isConnected} />;
  if (event) return <WatchEvent event={event} isConnected={isConnected} />;
  return null;
};

const WatchName: React.FC<{
  name: keyof Converters;
  isConnected?: boolean;
}> = ({ name, isConnected }) => {
  const [value, start] = useNotify(name);
  if (isConnected) start();
  return (
    <Card>
      <DataView value={value} />
    </Card>
  );
};

const WatchEvent: React.FC<{
  event: keyof De1Events;
  isConnected?: boolean;
}> = ({ event, isConnected }) => {
  const [value, start] = useEvent(event);
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
        style={{ fontSize: 12, width: 450, minHeight: 32 }}
      />
    );
  return <span>{JSON.stringify(value)}</span>;
};

export default Watch;
