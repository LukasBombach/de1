import React from "react";
import Info from "../components/UserApp/Info";
import Espresso from "../components/UserApp/Espresso";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return (
    <section>
      <Info isConnected={isConnected} />
      <Espresso isConnected={isConnected} />
    </section>
  );
};

export default UserApp;
