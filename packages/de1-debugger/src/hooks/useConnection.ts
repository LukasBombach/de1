import { useState } from "react";
import de1 from "../lib/de1";

export default function useConnection(): boolean {
  const [isConnnected, setIsConnected] = useState(de1.isConnected());

  de1.on("connected", () => setIsConnected(true));
  de1.on("disconnected", () => setIsConnected(false));

  return isConnnected;
}
