import { useState } from "react";
import de1 from ".";

export default function useConnection(): [
  boolean,
  () => Promise<void>,
  () => Promise<void>
] {
  const [isConnnected, setIsConnected] = useState(de1.isConnected());

  de1.on("connected", () => setIsConnected(true));
  de1.on("disconnected", () => setIsConnected(false));

  const connect = () => de1.connect();
  const disconnect = () => de1.disconnect();

  return [isConnnected, connect, disconnect];
}
