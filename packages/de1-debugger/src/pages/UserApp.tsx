import React from "react";
import "./UserApp.css";

interface UserAppProps {
  isConnected: boolean;
}

const UserApp: React.FC<UserAppProps> = ({ isConnected }) => {
  return <section>UserApp</section>;
};

export default UserApp;
