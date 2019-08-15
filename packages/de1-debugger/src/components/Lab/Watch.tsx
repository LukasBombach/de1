import React from "react";
import { Card } from "antd";
import { Converters, De1Events } from "de1";
import ReactJson from "react-json-view";
import useNotify from "../../hooks/useNotify";
import useEvent from "../../hooks/useEvent";

interface WatchProps {
  name?: keyof Converters;
  event?: keyof De1Events;
}

interface DataViewProps {
  name?: keyof Converters;
  value?: any;
}

const Watch: React.FC<WatchProps> = ({ name, event }) => {
  if (name) return <WatchName name={name} />;
  if (event) return <WatchEvent event={event} />;
  return null;
};

const WatchName: React.FC<{
  name: keyof Converters;
}> = ({ name }) => {
  const [value] = useNotify(name);
  return (
    <Card>
      <DataView value={value} />
    </Card>
  );
};

const WatchEvent: React.FC<{
  event: keyof De1Events;
}> = ({ event }) => {
  const [value] = useEvent(event);
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
