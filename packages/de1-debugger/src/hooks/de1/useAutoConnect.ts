import { useEffect } from "react";
import { message } from "antd";
import de1 from ".";

let hide: Function | null = null;

export default function useAutoConnect(): void {
  useEffect(() => {
    if (!de1.isConnected()) {
      hide = message.loading("Connecting...", 0);
      de1.connect();
    }

    if (de1.isConnected() && hide) {
      hide();
    }
  });
}
