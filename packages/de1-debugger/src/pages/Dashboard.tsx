import React from "react";
import { converters, Converters } from "de1";
import Control from "../components/Dashboard/Control";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const fullHeight = { height: "100%" };

  return (
    <section className="dashboard__grid" style={fullHeight}>
      {Object.entries(converters).map(([name, converter]) => (
        <Control
          key={converter.uuid}
          name={name as keyof Converters}
          converter={converter}
        />
      ))}
    </section>
  );
};

export default Dashboard;
