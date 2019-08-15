import React, { useState } from "react";
import { Card } from "antd";
import { Converters, Value } from "de1";
import { LineChart, Line, XAxis, YAxis, Legend } from "recharts";

import useNotify from "../../hooks/de1/useNotify";

interface ChartProps<N extends keyof Converters> {
  name: N;
  valueName: string;
  parseValue: (value: Value<Converters, N>) => number;
}

interface DataRecord {
  [key: string]: number;
}

const Chart: React.FC<ChartProps<keyof Converters>> = ({
  name,
  valueName,
  parseValue
}) => {
  const [data, setData] = useState<DataRecord[]>([]);
  const [initialTime] = useState(Date.now());
  const [value] = useNotify(name);

  const elapsedTime = Math.floor((Date.now() - initialTime) / 1000);

  const lastTime = data.length ? data[data.length - 1].elapsedTime : null;

  if (elapsedTime !== lastTime && typeof value !== "undefined") {
    setData(d => d.concat({ elapsedTime, [valueName]: parseValue(value!) }));
  }

  return (
    <Card>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Line type="monotone" dataKey={valueName} stroke="#8884d8" />
        <Legend />
      </LineChart>
    </Card>
  );
};

export default Chart;
