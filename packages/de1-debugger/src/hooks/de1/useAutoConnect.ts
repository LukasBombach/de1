import { useEffect } from "react";
import { message } from "antd";

let hide: Function | null = null;

export default function useAutoConnect(
  isConnected: boolean,
  connect: () => Promise<void>
): void {
  useEffect(() => {
    if (!isConnected) {
      hide = message.loading("Connecting...", 0);
      connect();
    }

    if (isConnected && hide) {
      hide();
    }
  });
}
