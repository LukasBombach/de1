import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import PowerButton from "./PowerButton";

const AppMenu: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{
        lineHeight: "64px",
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        width: "100%"
      }}
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/app">App</Link>
      </Menu.Item>
      <Menu.Item key="lab">
        <Link to="/lab">Lab</Link>
      </Menu.Item>
      <Menu.Item key="dashboard">
        <Link to="/dashboard/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="power" disabled={true} style={{ float: "right" }}>
        <PowerButton isConnected={isConnected} />
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
