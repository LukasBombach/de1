import React from "react";
import { converters, Converters } from "de1";
import Control from "../components/Dashboard/Control";
import "./Dashboard.css";

interface DashboardProps {
  isConnected: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected }) => {
  const fullHeight = { height: "100%" };

  return (
    <section className="dashboard__grid" style={fullHeight}>
      {Object.entries(converters).map(([name, converter]) => (
        <Control
          key={converter.uuid}
          name={name as keyof Converters}
          converter={converter}
          connected={isConnected}
        />
      ))}
    </section>
  );
};

export default Dashboard;
