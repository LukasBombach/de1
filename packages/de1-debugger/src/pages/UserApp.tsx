import React from "react";
import Info from "../components/UserApp/Info";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return (
    <section>
      <Info isConnected={isConnected} />
    </section>
  );
};

export default UserApp;
