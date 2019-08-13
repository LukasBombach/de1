import React from "react";
import { Empty } from "antd";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis
} from "recharts";
import { blue } from "@ant-design/colors";

const Chart: React.FC<{
  data: any[];
  lines: { dataKey: string; strokeDasharray?: string; stroke?: string }[];
  dataKey: string;
  unit?: string;
  description: string;
}> = ({ data = [], description, dataKey, unit, lines }) => {
  return (
    <ResponsiveContainer aspect={6 / 1}>
      {Boolean(data.length) ? (
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: -10 }}
        >
          {lines.map(line => (
            <Line
              key={line.dataKey}
              type="monotone"
              dot={false}
              strokeDasharray={line.strokeDasharray}
              dataKey={line.dataKey}
              stroke={line.stroke || blue.primary}
            />
          ))}

          <CartesianGrid strokeDasharray="2 2" />
          <YAxis dataKey={dataKey} unit={unit} />
          <XAxis tick={false} />
        </LineChart>
      ) : (
        <Empty
          description={description}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            border: "1px dashed #d9d9d9",
            borderRadius: 4,
            padding: 30
          }}
        />
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
