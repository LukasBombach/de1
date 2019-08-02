import React from "react";
import { Button } from "antd";

interface ReadProps {
  feature: String;
  connected?: boolean;
}

const Read: React.FC<ReadProps> = ({ feature, connected }) => (
  <div>
    <Button />
  </div>
);

export default Read;
