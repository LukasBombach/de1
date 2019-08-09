import React from "react";
import useNotify from "../hooks/de1/useNotify";
import useWrite from "../hooks/de1/useWrite";
import { StateInfo } from "de1/lib/src";
import { Button } from "antd";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  const [stateInfo, notifyAboutStates] = useNotify("stateInfo");
  if (!isConnected)
    return (
      <StandbyOverlay>
        <pre>disconnected</pre>
      </StandbyOverlay>
    );
  notifyAboutStates();
  if (typeof stateInfo === "undefined")
    return (
      <StandbyOverlay>
        <pre>loading...</pre>
      </StandbyOverlay>
    );

  return <ConnectedUserApp stateInfo={stateInfo} />;
};

const ConnectedUserApp: React.FC<{ stateInfo: StateInfo }> = ({
  stateInfo
}) => {
  const [, setState] = useWrite("state");

  return (
    <section>
      {stateInfo.state === "sleep" && (
        <StandbyOverlay>
          <Button onClick={() => setState("idle")}>Turn On</Button>
        </StandbyOverlay>
      )}
    </section>
  );
};

const StandbyOverlay: React.FC = ({ children }) => {
  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 225, 0.45), rgba(7, 20, 40, 0.45))"
      }}
    >
      {children}
    </section>
  );
};

export default UserApp;

// background: "rgba(7, 20, 40, 0.45)",
