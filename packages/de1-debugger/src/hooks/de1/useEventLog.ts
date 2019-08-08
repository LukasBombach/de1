import { useState } from "react";
import de1 from ".";

const events: any[] = [
  "stateChange",
  "discover",
  "connect",
  "disconnect",
  "rssiUpdate",
  "servicesDiscover",
  "includedServicesDiscover",
  "characteristicsDiscover",
  "read",
  "write",
  "broadcast",
  "notify",
  "descriptorsDiscover",
  "valueRead",
  "valueWrite",
  "handleRead",
  "handleWrite",
  "handleNotify",
  "scanStart",
  "scanStop"
];

export default function useEventLog(): void {
  const [isLogging, setIsLogging] = useState(false);
  if (!isLogging && de1.isConnected()) {
    for (const event of events) {
      de1.getBleService().on(event, (...args) => console.info(event, args));
    }
    setIsLogging(true);
  }
}
