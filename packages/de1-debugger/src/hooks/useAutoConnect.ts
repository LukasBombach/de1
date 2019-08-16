import { useEffect } from "react";
import { message } from "antd";
import de1 from "../lib/de1";

export default function useAutoConnect(): void {
  useEffect(() => {
    if (!de1.isConnected()) {
      const hide = message.loading("Connecting...", 0);
      de1.connect().then(hide);
    }
  });
}
