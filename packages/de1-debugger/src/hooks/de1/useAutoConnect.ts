import { useEffect, useState } from "react";
import { message } from "antd";
import de1 from ".";

export default function useAutoConnect(): void {
  const [hide, setHide] = useState<Function | undefined>(undefined);

  useEffect(() => {
    if (!de1.isConnected()) {
      setHide(message.loading("Connecting...", 0));
      de1.connect();
    }

    if (de1.isConnected() && hide) {
      hide();
    }
  });
}
