import React from "react";
import useConnection from "../hooks/de1/useConnection";
import useAutoConnect from "../hooks/de1/useAutoConnect";
import { Button, Icon } from "antd";

const Connection: React.FC = () => {
  const [isConnected, connect] = useConnection();

  useAutoConnect(isConnected, connect);

  const stickyBottomRight: React.CSSProperties = {
    position: "fixed",
    bottom: 20,
    right: 20
  };

  if (isConnected) {
    return (
      <Button type="primary" style={stickyBottomRight}>
        <Icon type="check-circle" theme="twoTone" />
        Connected!
      </Button>
    );
  } else {
    return null;
  }
};

export default Connection;
